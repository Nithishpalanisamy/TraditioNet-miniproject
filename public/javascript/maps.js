const states = {
    "Andhra Pradesh": { lat: 15.9129, lng: 79.73999 },
    "Arunachal Pradesh": { lat: 28.2180, lng: 94.7278 },
    "Assam": { lat: 26.2006, lng: 92.9376 },
    "Bihar": { lat: 25.0961, lng: 85.3131 },
    "Chhattisgarh": { lat: 21.2787, lng: 81.8661 },
    "Goa": { lat: 15.2993, lng: 74.1240 },
    "Gujarat": { lat: 22.2587, lng: 71.1924 },
    "Haryana": { lat: 29.0588, lng: 76.0856 },
    "Himachal Pradesh": { lat: 31.1048, lng: 77.1734 },
    "Jharkhand": { lat: 23.6102, lng: 85.2799 },
    "Karnataka": { lat: 15.3173, lng: 75.7139 },
    "Kerala": { lat: 10.8505, lng: 76.2711 },
    "Madhya Pradesh": { lat: 22.9734, lng: 78.6569 },
    "Maharashtra": { lat: 19.7515, lng: 75.7139 },
    "Manipur": { lat: 24.6637, lng: 93.9063 },
    "Meghalaya": { lat: 25.4670, lng: 91.3662 },
    "Mizoram": { lat: 23.1645, lng: 92.9376 },
    "Nagaland": { lat: 26.1584, lng: 94.5624 },
    "Odisha": { lat: 20.9517, lng: 85.0985 },
    "Punjab": { lat: 31.1471, lng: 75.3412 },
    "Rajasthan": { lat: 27.0238, lng: 74.2179 },
    "Sikkim": { lat: 27.5330, lng: 88.5122 },
    "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
    "Telangana": { lat: 18.1124, lng: 79.0193 },
    "Tripura": { lat: 23.9408, lng: 91.9882 },
    "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
    "Uttarakhand": { lat: 30.0668, lng: 79.0193 },
    "West Bengal": { lat: 22.9868, lng: 87.8550 }
};

function updateMapHeritage() {
    const selectedState = document.getElementById('stateDropdown1').value;
    if (selectedState === "none") return; 

    const location = states[selectedState];
    if (!location) return;

    const newMapSrc = `https://www.google.com/maps/d/u/0/embed?mid=18s3ukjbDqLp_6ZTjCItuWs_9msYTsuk&ll=${location.lat},${location.lng}&z=6`;
    document.getElementById('embeddedMap1').src = newMapSrc;
}

function updateMapFort() {
    const selectedState = document.getElementById('stateDropdown2').value;
    if (selectedState === "none") return; 

    const location = states[selectedState];
    if (!location) return;

    const newMapSrc = `https://www.google.com/maps/d/u/0/embed?mid=1apex8Bj1IZQxgsCuk44-KKoEWaniOG4&ll=${location.lat},${location.lng}&z=6`;
    document.getElementById('embeddedMap2').src = newMapSrc;
}

function updateMapTemple() {
    const selectedState = document.getElementById('stateDropdown3').value;
    if (selectedState === "none") return; 

    const location = states[selectedState];
    if (!location) return;

    const newMapSrc = `https://www.google.com/maps/d/u/0/embed?mid=1hEI1IolILetV2VBCBRhQF4Lg-DS8zJw&ll=${location.lat},${location.lng}&z=6`;
    document.getElementById('embeddedMap3').src = newMapSrc;
}

function updateMapMuseum() {
    const selectedState = document.getElementById('stateDropdown4').value;
    if (selectedState === "none") return; 

    const location = states[selectedState];
    if (!location) return;

    const newMapSrc = `https://www.google.com/maps/d/u/0/embed?mid=19r_Ilap0ZqFY0NKJtFlHAaBzmqE1y3M&ll=${location.lat},${location.lng}&z=6`;
    document.getElementById('embeddedMap4').src = newMapSrc;
}

function updateMapArchaeological() {
    const selectedState = document.getElementById('stateDropdown5').value;
    if (selectedState === "none") return; 

    const location = states[selectedState];
    if (!location) return;

    const newMapSrc = `https://www.google.com/maps/d/u/0/embed?mid=19UKb7LPGxK7TaHGXu9VaOhGSaCdo8hI&ll=${location.lat},${location.lng}&z=6`;
    document.getElementById('embeddedMap5').src = newMapSrc;
}
