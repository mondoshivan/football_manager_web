// Types for the scope of this package can be defined here.
// Global types for all packages must be defined in the global-types package.
//
// Note: When preventing the export keyword the declarations, 
//       the types are directly accessible without the need to import them

declare namespace config {
    
    interface PackageConfig {
        teams: TeamsConfig
    }

    interface TeamsConfig {
        initPlayerCount: number
        initEnabled: boolean
    }

    interface GameConfig {
        initGameDay: string
    }
}