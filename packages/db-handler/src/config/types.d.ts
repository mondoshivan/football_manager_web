// Types for the scope of this package can be defined here.
// Global types for all packages must be defined in the global-types package.
//
// Note: When preventing the export keyword the declarations, 
//       the types are directly accessible without the need to import them

declare namespace config {
    
    interface PackageConfig {
        db: DBConfig
    }

    interface DBConfig {
        name: string
        user: string
        host: string
        port: number
        dialect: string
        password: string
    }
}