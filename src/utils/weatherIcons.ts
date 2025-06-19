import {
    faSun,
    faCloud,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faBolt,
    faEye,
    faCloudSun
} from '@fortawesome/free-solid-svg-icons'

export const getWeatherIcon = (weatherCode: number) => {
    /*
        0	Clear sky
        1, 2, 3	Mainly clear, partly cloudy, and overcast
        45, 48	Fog and depositing rime fog
        51, 53, 55	Drizzle: Light, moderate, and dense intensity
        56, 57	Freezing Drizzle: Light and dense intensity
        61, 63, 65	Rain: Slight, moderate and heavy intensity
        66, 67	Freezing Rain: Light and heavy intensity
        71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
        77	Snow grains
        80, 81, 82	Rain showers: Slight, moderate, and violent
        85, 86	Snow showers slight and heavy
        95 *	Thunderstorm: Slight or moderate
        96, 99 *	Thunderstorm with slight and heavy hail
    */
    switch (weatherCode) {
        case 0:
        case 1:
            return faSun
        case 2:
            return faCloudSun
        case 3:
            return faCloud
        case 45:
        case 48:
            return faEye
        case 51:
        case 53:
        case 55:
            return faCloudRain
        case 56:
        case 57:
            return faCloudRain
        case 61:
        case 63:
        case 65:
            return faCloudShowersHeavy
        case 66:
        case 67:
            return faCloudShowersHeavy
        case 71:
        case 73:
        case 75:
            return faSnowflake
        case 77:
            return faSnowflake
        case 80:
        case 81:
        case 82:
            return faCloudShowersHeavy
        case 85:
        case 86:
            return faSnowflake
        case 95:
            return faBolt
        case 96:
        case 99:
            return faBolt
        default:
            return faSun
    }
}