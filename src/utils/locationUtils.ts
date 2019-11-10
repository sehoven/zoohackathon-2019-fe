declare interface AddressReturnType {
    formatted_address: string
};

export const getAddressFromGeocode = ({ lat, long }: coordinates): Promise<string> => {
    const geocoder = new window.google.maps.Geocoder();

    return new Promise((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng: long }}, (results: AddressReturnType[], status: string) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
                const firstResult: AddressReturnType = results[0];
                return resolve(firstResult.formatted_address); // TODO: add defensive coding
            }
            return reject(status);
        });
    });
}

export const getCurrentPosition = (): Promise<coordinates> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const coords = pos.coords;
                resolve({
                    lat: coords.latitude,
                    long: coords.longitude
                });
            }, 
            err => {
                reject(err);
            });
    });
}