import needle from 'needle';
import cheerio from 'cheerio';
import { BadRequestError } from '../helpers/errorHandler.js';
import ScrapedData from './scrapperModel/scrapperTargetModel.js';

const scrapperLoader = cheerio.load;
const urlAnalyzer = needle;

async function fetchUrl(url) {
  try {
    const response = await urlAnalyzer(url);
    return response.body;
  } catch (error) {
    return error.message;
  }
}

function checkInputContent(url, objectClass) {
  if (!url || !objectClass) {
    throw new BadRequestError('bad request');
  }
}

function scrapeData(bodyHtml, objectClass) {
  const articles = [];
  const scrapeLoad = scrapperLoader(bodyHtml);
  scrapeLoad(objectClass, bodyHtml).each(function () {
    const title = scrapeLoad(this).text();
    const link = scrapeLoad(this).find('a').attr('href');
    articles.push({
      title,
      link,
    });
  });
  return articles;
}

function removeSpecialChars(str) {
  const regex = /[\n\t]+/g;
  return str.replace(regex, '  ');
}

function filterArticles(articles, filterFn) {
  return articles.filter(filterFn);
}

function noKeyword() {
  return function () {
    return true;
  };
}

function withKeyword(keyWord) {
  return function (article) {
    const convertToLowerCase = article.title.toLowerCase();
    return convertToLowerCase.includes(keyWord);
  };
}

function cleanArticles(articles) {
  return articles.map((article) => {
    article.title = removeSpecialChars(article.title);
    return article;
  });
}

async function callingFunctions(req, res) {
  const keyword = req.body.keyWord;
  const url = req.body.url;
  const objectClass = req.body.objectClass;
  // obtiene el body de la pagina
  const bodyHtml = await fetchUrl(url);
  // identifica a los articulos que contienen la clase
  const articles = scrapeData(bodyHtml, objectClass);
  // limpia el texto contenido en los articulos para facilitar la lectura
  const cleanedArticles = cleanArticles(articles);
  const filterFn = keyword ? withKeyword(keyword) : noKeyword();
  // busca a los articulos por palabra clave si la hay sino llama a todos
  const filteredArticles = filterArticles(cleanedArticles, filterFn);
  return filteredArticles;
}

async function saveScrapedDataToDatabase(req, res) {
  const arrayResultsScrapped = await callingFunctions(req, res);
  const url = req.body.url;
  const containerClass = req.body.objectClass;
  const keyword = req.body.keyWord;
  await ScrapedData.create({
    url,
    containerClass,
    keyword,
    scanDate: new Date(),
    articles: arrayResultsScrapped.filteredArticles,
  });
}

const scrappActionResponse = function Scrapper(req, res) {
  const data = saveScrapedDataToDatabase(req, res);
  res.json({
    state: 'success',
    'objects found': data.length,
    'key-word': data.keyword,
    'scanned webpage': data.url,
    'found articles': data.articles,
  });
};

const scrappService = {
  scrappActionResponse,
  checkInputContent,
  fetchUrl,
  scrapeData,
  removeSpecialChars,
  filterArticles,
  noKeyword,
  withKeyword,
  cleanArticles,
};

export default scrappService;
