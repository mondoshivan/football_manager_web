// Types for the scope of this package can be defined here.
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