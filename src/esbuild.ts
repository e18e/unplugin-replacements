import {createEsbuildPlugin} from 'unplugin';
import {unpluginFactory} from './main.js';

export default createEsbuildPlugin(unpluginFactory);
