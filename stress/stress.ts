import config from 'config';
import { exit } from 'process';
import util from 'util';
import fs from 'fs';
import childProcess from 'child_process';
import commandExists from 'command-exists';
const exec = util.promisify(childProcess.exec);
import { cardsIdsLoaded } from './cards-ids-loaded';

const BASE_URL = 'http://localhost:9091';
const ownerToken = config.get('ownerToken');
const cardIds: string[] = cardsIdsLoaded;

const getStress = async () => {
  await commandExistInSO('ab');
  const id = Math.floor(Math.random() * 500) + 1;

  const { stdout, stderr } = await exec(
    `ab -n 10000 -c 1000 -H "authorization: token ${ownerToken}" ${BASE_URL}/cards/card?id=${cardIds[id]} `,
  );
  writeReport(stdout + stderr);
  console.log(stdout);
};

const main = async () => {
  await getStress();
};

const commandExistInSO = async (command: string) => {
  try {
    await commandExists(command);
  } catch (error) {
    printError(command);
    exit(0);
  }
};

const writeReport = (report: any) => {
  const date: string = getDateFormatted();
  const logFile = fs.createWriteStream(
    __dirname + `/reports/stress_test_${date}.log`,
    {
      flags: 'w',
    },
  );
  const logStdout = process.stdout;

  console.log = (d: string) => {
    logFile.write(util.format(d) + '\n');
    logStdout.write(util.format(d) + '\n');
  };
};

const getDateFormatted = (): string => {
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
};

const printError = (command: string) => {
  console.error(
    '********************************** WARNING ****************************************',
  );
  console.error(
    `* ${command} command not exist in your SO, please install it before run stress process *`,
  );
  console.error(
    '***********************************************************************************',
  );
};
void main();
