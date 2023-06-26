import { config } from 'process';
import { Property, Config, TSConvict } from 'ts-convict';
import { DBConfig } from './config_db.js';

@Config({
    
    // optional default file to load, no errors if it doesn't exist
    // file: 'config.yml',// relative to NODE_PATH or cwd()

    // optional parameter. Defaults to 'strict', can also be 'warn'
    validationMethod: 'strict',

    // optionally add parsers like yaml or toml
    // parser: { 
    //     extension: ['yml', 'yaml'], 
    //     parse: yaml.safeLoad
    // },

    //optional extra formats to use in validation
    // formats: {
    //     url,
    //     ipaddress,
    // }
    
})

class PackageConfig implements config.PackageConfig {

    @Property(DBConfig)
    public db!: config.DBConfig;

}

const configLoader = new TSConvict<PackageConfig>(PackageConfig);
const configObj = configLoader.load();

export { configObj as config };