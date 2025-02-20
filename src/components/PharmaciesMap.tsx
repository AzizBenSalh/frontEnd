import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Clock, Phone, Navigation, Stethoscope } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix pour les marqueurs par défaut
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icônes personnalisées
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div class="w-8 h-8 rounded-full ${color} flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12h6m-3-3v6M3 21h18M3 7V3h18v4M3 7h18M6 7v14m12-14v14" />
            </svg>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const openIcon = createCustomIcon('bg-emerald-500');
const closedIcon = createCustomIcon('bg-red-500');
const userIcon = L.divIcon({
  className: 'custom-icon',
  html: `<div class="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center shadow-lg">
          <div class="w-4 h-4 bg-white rounded-full"></div>
        </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Composant pour changer la vue de la carte
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center);
  return null;
}

// Composant Légende
function Legend() {
  return (
    <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg z-[1000]">
      <h4 className="font-semibold mb-2">Légende</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
          <span className="text-sm">Pharmacie ouverte</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm">Pharmacie fermée</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-sky-500"></div>
          <span className="text-sm">Votre position</span>
        </div>
      </div>
    </div>
  );
}

// Fonction de calcul de distance (formule de Haversine)
function haversineDistance(coords1: [number, number], coords2: [number, number]): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Exemple de données de pharmacies
const pharmacies = [
  {
    id: 1,
    name: 'Pharmacie Centrale Tunis',
    address: '15 Avenue Habib Bourguiba, Tunis',
    phone: '71 123 456',
    position: [36.7992, 10.1802] as [number, number],
    isOpen: true,
    hours: '8h00 - 23h00',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Pharmacie moderne située au cœur de Tunis.',
  },
  {
    id: 2,
    name: 'Pharmacie La Marsa',
    address: '45 Avenue de la Plage, La Marsa',
    phone: '71 234 567',
    position: [36.8892, 10.3225] as [number, number],
    isOpen: false,
    hours: '9h00 - 19h00',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Pharmacie de quartier à La Marsa.',
  },
  {
    id: 3,
    name: 'Pharmacie de Nuit Lac',
    address: '78 Les Berges du Lac, Tunis',
    phone: '71 345 678',
    position: [36.8317, 10.2292] as [number, number],
    isOpen: true,
    hours: '24h/24',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Pharmacie de garde 24h/24 au Lac.',
  },
];

function PharmaciesMap() {
  const [userLocation, setUserLocation] = useState<[number, number]>([36.8065, 10.1815]); // Position par défaut (Tunis)
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultLocation: [number, number] = [36.8065, 10.1815]; // Default to Tunis

    const handleGeolocationError = (error: GeolocationPositionError) => {
      console.error('Erreur de géolocalisation native:', error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.warn('L\'utilisateur a refusé la demande de géolocalisation.');
          break;
        case error.POSITION_UNAVAILABLE:
          console.warn('Les informations de localisation ne sont pas disponibles.');
          break;
        case error.TIMEOUT:
          console.warn('La demande de localisation a expiré.');
          break;
        default:
          console.warn('Une erreur inconnue est survenue lors de la géolocalisation.');
      }
      console.log('Tentative de récupération de la localisation via IP...');
      // Fallback to IP-based geolocation
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data) => {
          console.log('Données de localisation IP:', data);
          if (data && data.latitude && data.longitude) {
            setUserLocation([data.latitude, data.longitude]);
          } else {
            console.warn('Localisation IP non disponible, utilisation de la localisation par défaut.');
            setUserLocation(defaultLocation); // Fallback to default location
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Erreur lors de la récupération via ipapi:', err);
          setUserLocation(defaultLocation); // Fallback to default location
          setLoading(false);
        });
    };

    const retryGeolocation = (retries = 3, delay = 1000) => {
      if (retries === 0) {
        console.warn('Nombre maximal de tentatives atteint. Utilisation de la localisation par défaut.');
        setUserLocation(defaultLocation);
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Localisation native réussie:', position);
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setLoading(false);
        },
        (error) => {
          console.error('Erreur de géolocalisation native. Tentative restante:', retries - 1);
          setTimeout(() => retryGeolocation(retries - 1, delay), delay);
        },
        { timeout: 10000 },
      );
    };

    if (navigator.geolocation) {
      retryGeolocation();
    } else {
      // If geolocation is not supported, use IP-based geolocation
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.latitude && data.longitude) {
            setUserLocation([data.latitude, data.longitude]);
          } else {
            setUserLocation(defaultLocation); // Fallback to default location
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Erreur lors de la récupération via ipapi:', err);
          setUserLocation(defaultLocation); // Fallback to default location
          setLoading(false);
        });
    }
  }, []);

  // Calculer la distance entre la position utilisateur et chaque pharmacie
  const sortedPharmacies = pharmacies
    .map((pharmacy) => ({
      ...pharmacy,
      distanceCalculated: haversineDistance(userLocation, pharmacy.position),
    }))
    .sort((a, b) => a.distanceCalculated - b.distanceCalculated);

  // On affiche par exemple les 3 pharmacies les plus proches
  const nearestPharmacies = sortedPharmacies.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Pharmacies à proximité</h1>
          <p className="mt-2 text-lg text-gray-600">
            Trouvez les pharmacies les plus proches de vous en Tunisie
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Liste des pharmacies les plus proches */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 text-sky-600 mb-4">
                <Stethoscope className="h-5 w-5" />
                <h3 className="font-semibold">Pharmacies disponibles</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Cliquez sur une pharmacie pour voir plus de détails et calculer l'itinéraire.
              </p>
            </div>

            {nearestPharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedPharmacy?.id === pharmacy.id ? 'ring-2 ring-sky-500' : ''
                }`}
                onClick={() => setSelectedPharmacy(pharmacy)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{pharmacy.name}</h3>
                        <p className="text-gray-500 mt-1">{pharmacy.address}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        pharmacy.isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {pharmacy.isOpen ? 'Ouvert' : 'Fermé'}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{pharmacy.hours}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{pharmacy.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Navigation className="h-4 w-4 mr-2" />
                        <span>{pharmacy.distanceCalculated.toFixed(2)} km</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carte affichant uniquement les pharmacies les plus proches */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden relative">
            <div className="h-[800px]">
              <MapContainer
                key={userLocation.toString()} // Force re-render when userLocation changes
                center={userLocation}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <ChangeView center={userLocation} />
                <ZoomControl position="bottomleft" />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Marqueur pour la position utilisateur */}
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">Votre position</h3>
                    </div>
                  </Popup>
                </Marker>

                {/* Marqueurs pour les pharmacies les plus proches */}
                {nearestPharmacies.map((pharmacy) => (
                  <Marker
                    key={pharmacy.id}
                    position={pharmacy.position}
                    icon={pharmacy.isOpen ? openIcon : closedIcon}
                    eventHandlers={{
                      click: () => setSelectedPharmacy(pharmacy),
                    }}
                  >
                    <Popup>
                      <div className="p-3">
                        <img
                          src={pharmacy.image}
                          alt={pharmacy.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                        <p className="text-sm text-gray-600">{pharmacy.address}</p>
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                            pharmacy.isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {pharmacy.isOpen ? '● Ouvert' : '● Fermé'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{pharmacy.hours}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                <Legend />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmaciesMap;