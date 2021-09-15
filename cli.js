#!/usr/bin/env node
'use strict';
const {debuglog} = require('util')
const importLocal = require('import-local');
const { isForInStatement } = require('typescript');
const isInstalledGlobally = require('is-installed-globally')

const log = debuglog('data-schema-seeder')

if(!importLocal(__filename)) {
  if (isInstalledGlobally) {
    log('Using global install of data-schema-seeder.')
  }

  require('./dist/app')
}