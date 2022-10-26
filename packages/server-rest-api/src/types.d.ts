// Types for the scope of this package can be defined here.
// Global types for all packages must be defined in the global-types package.
//
// Note: When preventing the export keyword the declarations, 
//       the types are directly accessible without the need to import them

declare namespace config {
    
    interface PackageConfig {
        service: ServiceConfig
    }

    interface ServiceConfig {
        frontEndDir: string
        port: number
    }
}

// no types available from express-query-boolean package -> package.json
declare module "express-query-boolean"