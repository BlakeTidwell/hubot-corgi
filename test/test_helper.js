// Test helper
import dotenv from 'dotenv';
dotenv.load({silent: true, path: './.env.local'});

import {expect} from 'chai';
global.expect = expect;

