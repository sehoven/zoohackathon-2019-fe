declare interface location {
    lat: number,
    long: number,
    radius: number
}

declare interface dateRange {
    startDate: number,
    endDate: number
}

declare interface activity {
    location: location,
    dateRange: dateRange
}

declare interface coordinates {
    lat: number,
    long: number
}