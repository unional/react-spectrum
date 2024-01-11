#!/usr/bin/env node

import chalk from 'chalk';
import {copyComponents} from './helpers/copyComponents.js';
import {copyIndexFile} from './helpers/copyIndexFile.js';
import {copyRemainingFiles} from './helpers/copyRemainingFiles.js';
import {copyStories} from './helpers/copyStories.js';
import {exec} from 'child_process';
import path from 'path';
import prompts from 'prompts';
import {readComponents} from './helpers/readComponents.js';
import {readStarters} from './helpers/readStarters.js';

async function main() {
  const {action} = await prompts({
    type: 'select',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      {
        title: 'Create a new component library',
        value: 'Create a new library'
      },
      {
        title: 'Add component(s) to an existing project',
        value: 'Add components'
      }
    ]
  });

  if (action === 'Add components') {
    console.log('Components will be added to the current directory.');
  }

  let projectName;
  if (action === 'Create a new library') {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'What is your project named?',
      initial: 'my-component-library'
    });
    projectName = response.projectName;
  } else {
    projectName = '.';
  }

  const starters = await readStarters();
  const {starter} = await prompts({
    type: 'select',
    name: 'starter',
    message: 'Select a starter',
    choices: starters.map((t) => ({title: t, value: t}))
  });

  const components = await readComponents(starter);
  let {selectedComponents} = await prompts({
    type: 'multiselect',
    name: 'selectedComponents',
    message: 'Select the components you want to include',
    choices: [
      {title: 'All (Default)', value: 'All', selected: true},
      ...components.map((c) => ({title: c, value: c.replace(/\.(tsx?$|jsx?$)/g, '')}))
    ]
  });
  let includesAll = selectedComponents.includes('All');
  if (includesAll) {
    selectedComponents = components;
  }


  await copyComponents(selectedComponents, starter, projectName);
  await copyStories(selectedComponents, starter, projectName);
  await copyRemainingFiles(starter, projectName);

  if (action === 'Create a new library') {
    await copyIndexFile(starter, projectName, selectedComponents, includesAll);

    console.log(
      `Creating a new component library in ${path.resolve()}/${projectName}.`
    );
    console.log(`Initializing project with starter: ${starter}`);
    console.log('Installing dependencies...');

    exec(`cd ${projectName} && npm install`);
    console.log(
      chalk.green(
        `\nSuccess! Created ${chalk.bold(projectName)} at ${path.resolve()}/${projectName}`
      )
    );
  } else {
    console.log(chalk.green('\nComponents successfully added!'));
  }

  console.log(
    chalk.cyan('\nYou can access the React Aria documentation here: ') +
    chalk.underline('\nhttps://react-spectrum.adobe.com/react-aria/index.html')
  );

  if (action === 'Create a new library') {
    console.log(
      chalk.cyan(`\nYou can start Storybook by running:\n\ncd ${projectName}\nnpm run storybook`)
    );
  }

  if (action === 'Add components') {
    console.log(
      chalk.cyan('\nBe sure your project includes all dependencies needed (Storybook, React, React DOM, etc.)')
    );
  }

  process.exit(0);
}

main();
