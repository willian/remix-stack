const { execSync } = require('child_process')
const crypto = require('crypto')
const fs = require('fs/promises')
const path = require('path')
const sort = require('sort-package-json')
const { toLogicalID } = require('@architect/utils')

function getRandomString(length) {
  return crypto.randomBytes(length).toString('hex')
}

async function main({ rootDirectory }) {
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, '.env.example')
  const ENV_PATH = path.join(rootDirectory, '.env')
  const PACKAGE_JSON_PATH = path.join(rootDirectory, 'package.json')
  const README_PATH = path.join(rootDirectory, 'README.md')
  const DIR_NAME = path.basename(rootDirectory)
  const SUFFIX = getRandomString(2)
  const APP_NAME = (DIR_NAME + '-' + SUFFIX).replace(/[^a-zA-Z0-9-_]/g, '-')

  const [env, packageJson, readme] = await Promise.all([
    fs.readFile(EXAMPLE_ENV_PATH, 'utf-8'),
    fs.readFile(PACKAGE_JSON_PATH, 'utf-8'),
    fs.readFile(README_PATH, 'utf-8'),
  ])

  const newEnv = env.replace(/^SESSION_SECRET=.*$/m, `SESSION_SECRET="${getRandomString(16)}"`)

  const newPackageJson =
    JSON.stringify(sort({ ...JSON.parse(packageJson), name: APP_NAME }), null, 2) + '\n'

  await Promise.all([
    fs.writeFile(ENV_PATH, newEnv),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
    fs.writeFile(
      README_PATH,
      readme.replace(new RegExp('Remix Stack Template', 'g'), toLogicalID(APP_NAME)),
    ),
    fs.copyFile(
      path.join(rootDirectory, 'remix.init', 'gitignore'),
      path.join(rootDirectory, '.gitignore'),
    ),
  ])

  console.log(`Running the validate script to make sure everything was set up properly`)
  execSync(`npm run validate`, { stdio: 'inherit', cwd: rootDirectory })

  execSync(`git init`, { stdio: 'inherit', cwd: rootDirectory })

  console.log(
    `Setup is complete. You're now ready to rock and roll 🤘
Start development with \`npm run dev\`
    `.trim(),
  )
}

module.exports = main
