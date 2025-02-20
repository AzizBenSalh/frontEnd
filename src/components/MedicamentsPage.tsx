import React, { useState } from 'react';
import { Search, Pill, FlaskRound as Flask, Stethoscope, AlertCircle, Clock, MapPin, Package, ShieldAlert, Syringe, ThumbsUp } from 'lucide-react';

// Sample medication data (in real app, this would come from an API)
const medications = [
  {
    id: 1,
    name: 'DOLIPRANE',
    nameAr: 'دوليبران',
    form: 'Comprimé',
    formAr: 'أقراص',
    dosage: '1000 mg',
    laboratory: 'SANOFI',
    price: '3.500',
    description: "Traitement symptomatique des douleurs d'intensité légère à modérée et/ou des états fébriles",
    descriptionAr: 'علاج أعراض الآلام الخفيفة إلى المتوسطة و/أو حالات الحمى',
    composition: 'Paracétamol',
    compositionAr: 'باراسيتامول',
    usage: 'Voie orale. 1 comprimé toutes les 6 heures si besoin',
    usageAr: 'عن طريق الفم. قرص واحد كل 6 ساعات عند الحاجة',
    sideEffects: 'Réactions allergiques, troubles hépatiques',
    sideEffectsAr: 'ردود فعل تحسسية، اضطرابات الكبد',
    stock: 150,
    availability: true,
    alternatives: [2, 3], // IDs of alternative medications
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pharmacies: [
      { id: 1, name: 'Pharmacie Centrale', distance: '0.5 km', stock: 150 },
      { id: 2, name: 'Pharmacie La Marsa', distance: '1.2 km', stock: 75 }
    ]
  },
  {
    id: 2,
    name: 'EFFERALGAN',
    nameAr: 'إيفرالغان',
    form: 'Comprimé effervescent',
    formAr: 'أقراص فوارة',
    dosage: '1000 mg',
    laboratory: 'UPSA',
    price: '4.200',
    description: 'Traitement symptomatique des douleurs et/ou fièvre',
    descriptionAr: 'علاج أعراض الألم و/أو الحمى',
    composition: 'Paracétamol',
    compositionAr: 'باراسيتامول',
    usage: 'Voie orale. 1 comprimé dissous dans un verre d\'eau toutes les 6 heures si besoin',
    usageAr: 'عن طريق الفم. قرص واحد يذوب في كأس ماء كل 6 ساعات عند الحاجة',
    sideEffects: 'Réactions allergiques, troubles digestifs',
    sideEffectsAr: 'ردود فعل تحسسية، اضطرابات هضمية',
    stock: 85,
    availability: true,
    alternatives: [1, 3],
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pharmacies: [
      { id: 1, name: 'Pharmacie Centrale', distance: '0.5 km', stock: 85 }
    ]
  },
  {
    id: 3,
    name: 'DAFALGAN',
    nameAr: 'دافالغان',
    form: 'Gélule',
    formAr: 'كبسولات',
    dosage: '1000 mg',
    laboratory: 'BRISTOL MYERS SQUIBB',
    price: '3.800',
    description: 'Traitement de la douleur et/ou fièvre',
    descriptionAr: 'علاج الألم و/أو الحمى',
    composition: 'Paracétamol',
    compositionAr: 'باراسيتامول',
    usage: 'Voie orale. 1 gélule toutes les 6 heures si besoin',
    usageAr: 'عن طريق الفم. كبسولة واحدة كل 6 ساعات عند الحاجة',
    sideEffects: 'Réactions allergiques, troubles hépatiques',
    sideEffectsAr: 'ردود فعل تحسسية، اضطرابات الكبد',
    stock: 200,
    availability: true,
    alternatives: [1, 2],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pharmacies: [
      { id: 3, name: 'Pharmacie du Lac', distance: '0.8 km', stock: 200 }
    ]
  },
  {
    id: 4,
    name: 'AUGMENTIN',
    nameAr: 'أوجمنتين',
    form: 'Comprimé',
    formAr: 'أقراص',
    dosage: '1g/125mg',
    laboratory: 'GSK',
    price: '12.500',
    description: 'Antibiotique de la famille des bêta-lactamines',
    descriptionAr: 'مضاد حيوي من عائلة البيتا لاكتام',
    composition: 'Amoxicilline + Acide clavulanique',
    compositionAr: 'أموكسيسيلين + حمض كلافولانيك',
    usage: 'Voie orale. 1 comprimé toutes les 12 heures',
    usageAr: 'عن طريق الفم. قرص واحد كل 12 ساعة',
    sideEffects: 'Diarrhée, nausées, réactions allergiques',
    sideEffectsAr: 'إسهال، غثيان، ردود فعل تحسسية',
    stock: 30,
    availability: true,
    alternatives: [5],
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pharmacies: [
      { id: 1, name: 'Pharmacie Centrale', distance: '0.5 km', stock: 30 }
    ]
  },
  {
    id: 5,
    name: 'CLAMOXYL',
    nameAr: 'كلاموكسيل',
    form: 'Gélule',
    formAr: 'كبسولات',
    dosage: '500 mg',
    laboratory: 'GSK',
    price: '8.900',
    description: 'Antibiotique de la famille des bêta-lactamines',
    descriptionAr: 'مضاد حيوي من عائلة البيتا لاكتام',
    composition: 'Amoxicilline',
    compositionAr: 'أموكسيسيلين',
    usage: 'Voie orale. 1 gélule toutes les 8 heures',
    usageAr: 'عن طريق الفم. كبسولة واحدة كل 8 ساعات',
    sideEffects: 'Diarrhée, nausées, réactions allergiques',
    sideEffectsAr: 'إسهال، غثيان، ردود فعل تحسسية',
    stock: 0,
    availability: false,
    alternatives: [4],
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pharmacies: []
  }
];

function StockStatus({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <div className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
        Rupture de stock
      </div>
    );
  } else if (stock < 50) {
    return (
      <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
        Stock limité ({stock})
      </div>
    );
  }
  return (
    <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
      En stock ({stock})
    </div>
  );
}

function AlternativeMedications({ alternatives, currentMed }: { alternatives: number[], currentMed: any }) {
  const altMeds = medications.filter(med => alternatives.includes(med.id));
  
  if (altMeds.length === 0) return null;

  return (
    <div className="mt-6 p-4 bg-sky-50 rounded-xl">
      <div className="flex items-center gap-2 text-sky-700 mb-4">
        <Syringe className="h-5 w-5" />
        <h4 className="font-medium">Alternatives disponibles</h4>
      </div>
      <div className="space-y-4">
        {altMeds.map(med => (
          <div key={med.id} className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
            <img
              src={med.image}
              alt={med.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">{med.name}</h5>
                  <p className="text-sm text-gray-500">{med.form} - {med.dosage}</p>
                </div>
                <StockStatus stock={med.stock} />
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Flask className="h-4 w-4" />
                  <span>{med.laboratory}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  <span>{med.price} DT</span>
                </div>
              </div>
              {med.stock > 0 && med.pharmacies.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="text-emerald-600 font-medium">
                    Disponible à {med.pharmacies[0].name} ({med.pharmacies[0].distance})
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicamentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMed, setSelectedMed] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'fr' | 'ar'>('fr');

  const filteredMeds = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.nameAr.includes(searchTerm) ||
    med.composition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.compositionAr.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Médicaments</h1>
          <p className="mt-2 text-lg text-gray-600">
            Recherchez des médicaments et trouvez les pharmacies qui les stockent
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un médicament par nom ou composition..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-gray-50 focus:ring-2 focus:ring-sky-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continuing with the MedicamentsPage.tsx file content:

          {/* Medication List */}
          <div className="lg:col-span-1 space-y-4">
            {filteredMeds.map((med) => (
              <div
                key={med.id}
                className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedMed?.id === med.id ? 'ring-2 ring-sky-500' : ''
                }`}
                onClick={() => setSelectedMed(med)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={med.image}
                    alt={med.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-gray-500">{med.nameAr}</p>
                      </div>
                      <StockStatus stock={med.stock} />
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Flask className="h-4 w-4 mr-2" />
                        <span>{med.form} - {med.dosage}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Stethoscope className="h-4 w-4 mr-2" />
                        <span>{med.laboratory}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sky-600 font-semibold">{med.price} DT</span>
                    </div>
                    {med.stock === 0 && med.alternatives.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 text-orange-600">
                        <ShieldAlert className="h-4 w-4" />
                        <span className="text-sm">Alternatives disponibles</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Medication Details */}
          <div className="lg:col-span-2">
            {selectedMed ? (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                {/* Language Toggle */}
                <div className="flex justify-end mb-6">
                  <div className="bg-gray-100 rounded-lg p-1">
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'fr' ? 'bg-white shadow text-sky-600' : 'text-gray-600'
                      }`}
                      onClick={() => setActiveTab('fr')}
                    >
                      Français
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'ar' ? 'bg-white shadow text-sky-600' : 'text-gray-600'
                      }`}
                      onClick={() => setActiveTab('ar')}
                    >
                      العربية
                    </button>
                  </div>
                </div>

                <div className={activeTab === 'ar' ? 'text-right' : ''}>
                  {/* Header */}
                  <div className="border-b pb-6">
                    <div className="flex items-start gap-6">
                      <img
                        src={selectedMed.image}
                        alt={selectedMed.name}
                        className="w-32 h-32 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900">
                          {activeTab === 'fr' ? selectedMed.name : selectedMed.nameAr}
                        </h2>
                        <p className="text-lg text-gray-600 mt-2">
                          {activeTab === 'fr' ? selectedMed.form : selectedMed.formAr} - {selectedMed.dosage}
                        </p>
                        <div className="mt-4">
                          <StockStatus stock={selectedMed.stock} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-8 space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {activeTab === 'fr' ? 'Description' : 'وصف'}
                      </h3>
                      <p className="text-gray-600">
                        {activeTab === 'fr' ? selectedMed.description : selectedMed.descriptionAr}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {activeTab === 'fr' ? 'Composition' : 'مكونات'}
                      </h3>
                      <p className="text-gray-600">
                        {activeTab === 'fr' ? selectedMed.composition : selectedMed.compositionAr}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {activeTab === 'fr' ? "Mode d'emploi" : 'طريقة الاستخدام'}
                      </h3>
                      <p className="text-gray-600">
                        {activeTab === 'fr' ? selectedMed.usage : selectedMed.usageAr}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {activeTab === 'fr' ? 'Effets secondaires' : 'آثار جانبية'}
                      </h3>
                      <p className="text-gray-600">
                        {activeTab === 'fr' ? selectedMed.sideEffects : selectedMed.sideEffectsAr}
                      </p>
                    </div>

                    {selectedMed.stock > 0 && selectedMed.pharmacies.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {activeTab === 'fr' ? 'Pharmacies à proximité' : 'الصيدليات القريبة'}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {selectedMed.pharmacies.map((pharmacy: any) => (
                            <div key={pharmacy.id} className="bg-gray-50 rounded-xl p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
                                  <div className="flex items-center text-gray-600 mt-2">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{pharmacy.distance}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600 mt-1">
                                    <Package className="h-4 w-4 mr-2" />
                                    <span>Stock: {pharmacy.stock}</span>
                                  </div>
                                </div>
                                <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
                                  {activeTab === 'fr' ? 'Voir' : 'عرض'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show alternatives if stock is low or unavailable */}
                    {(selectedMed.stock === 0 || selectedMed.stock < 50) && (
                      <AlternativeMedications
                        alternatives={selectedMed.alternatives}
                        currentMed={selectedMed}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                <Pill className="h-16 w-16 text-sky-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sélectionnez un médicament
                </h3>
                <p className="text-gray-600">
                  Cliquez sur un médicament pour voir les détails et la disponibilité
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicamentsPage;