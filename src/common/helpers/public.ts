import {ConfigService} from "@nestjs/config";

let getRandomInt = (max : number) => {
  return Math.floor(Math.random() * max);
}

let mowLogsConsole = (name : string = "MOW CONSOLE", ...log : any) => {
  console.log(`\n\n=====================${name}=====================\n\n`);
  console.log(log);
  console.log("\n\n=====================END CONSOLE=====================\n\n");

}

let paramsRequire = (paramName : any) => {
  throw `${paramName} is required!!!`;
}

export {
  getRandomInt,
  mowLogsConsole,
  paramsRequire
};
