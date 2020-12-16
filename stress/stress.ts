import config from 'config';
import { exit } from 'process';
import util from 'util';
import fs from 'fs';

const exec = util.promisify(require('child_process').exec);
var commandExists = require('command-exists');
const BASE_URL = 'http://localhost:9091';
const ownerToken = config.get('ownerToken');
const cardIds: string[] = [
  '5fd9f52c74463790065e3216',
  '5fd9f52c74463790065e3217',
  '5fd9f52c74463790065e3218',
  '5fd9f52c74463790065e3219',
  '5fd9f52c74463790065e321a',
  '5fd9f52c74463790065e321b',
  '5fd9f52c74463790065e321c',
  '5fd9f52c74463790065e321d',
  '5fd9f52c74463790065e321e',
  '5fd9f52c74463790065e321f',
  '5fd9f52c74463790065e3220',
  '5fd9f52c74463790065e3221',
  '5fd9f52c74463790065e3222',
  '5fd9f52c74463790065e3223',
  '5fd9f52c74463790065e3224',
  '5fd9f52d74463790065e3225',
  '5fd9f52d74463790065e3226',
  '5fd9f52d74463790065e3227',
  '5fd9f52d74463790065e3228',
  '5fd9f52d74463790065e3229',
];

async function getStress() {
  await commandExistInSO('ab');
  const id = Math.floor(Math.random() * 19) + 1;

  const { stdout, stderr } = await exec(
    `ab -n 100 -c 100 -H "authorization: token ${ownerToken}" ${BASE_URL}/cards/card?id=${cardIds[id]} `,
  );
  writeReport(stdout + stderr);
  console.log(stderr);
  console.log(stdout);
}

async function main() {
  await getStress();
}

async function commandExistInSO(command: string) {
  try {
    await commandExists(command);
  } catch (error) {
    printError(command);
    exit(0);
  }
}

function writeReport(report: NodeJS.WritableStream) {
  const date: string = getDateFormatted();
  var log_file = fs.createWriteStream(
    __dirname + `/reports/stress_test_${date}.log`,
    {
      flags: 'w',
    },
  );
  var log_stdout = process.stdout;

  console.log = function (d: string) {
    //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
  };
}

function getDateFormatted(): string {
  const d = new Date();
  const date = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
  console.log(date);
  const dateArr = date.split('/');
  console.log();
  return `${dateArr[2]}${dateArr[1]}${dateArr[0]}`;
}

function printError(command: string) {
  console.error(
    '********************************** WARNING ****************************************',
  );
  console.error(
    `* ${command} command not exist in your SO, please install it before run stress process *`,
  );
  console.error(
    '***********************************************************************************',
  );
}
main();
