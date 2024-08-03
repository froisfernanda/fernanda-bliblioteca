import fs from 'fs';
import chalk from 'chalk';

function extraioLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  return resultados.length !== 0 ? resultados : 'não há links no arquivo';
}

function MudarErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

// async/await

async function pegarArqui(caminhoDoArqui) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArqui, encoding)
    return extraioLinks(texto);
  } catch (erro) {
    MudarErro(erro)
  }
}

export default pegarArqui;

module.exports ={
  extraioLinks,
  MudarErro,
  pegarArqui
}
