import { config } from 'process';
import { Property, Config, TSConvict } from 'ts-convict';
import { TeamsConfig } from './config_teams';

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

    @Property(TeamsConfig)
    public teams!: config.TeamsConfig;

}

const configLoader = new TSConvict<PackageConfig>(PackageConfig);
export = configLoader.load();