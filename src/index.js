#! /usr/bin/env node
import fs from 'fs'
import path from 'path'
import * as commander from 'commander'
import figlet from 'figlet'
import chalk from 'chalk'
import create from './lib/create.js'
import { readFile } from "fs/promises"
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const packageJsonPath = path.join(__dirname, '../package.json')
const pkg = JSON.parse(await readFile(packageJsonPath))

const program = new commander.Command(pkg.name)

program
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 在 create.js 中执行创建任务
    create(name, options)
  })

// 配置版本号信息
program
  .version(pkg.version)
  .usage('<command> [option]')

  program
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('reactcli', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`react-cli <command> --help`)} show details\r\n`)
  })

// 解析用户执行命令传入参数
program.parse(process.argv)
