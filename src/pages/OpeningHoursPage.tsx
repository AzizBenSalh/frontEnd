import React, { useState } from 'react';
import { Clock, Save, AlertCircle, CheckCircle2, Calendar, Sun, Moon, AlertTriangle } from 'lucide-react';

interface DaySchedule {
  day: string;
  dayFr: string;
  isOpen: boolean;
  morning: {
    open: string;
    close: string;
  };
  afternoon: {
    open: string;
    close: string;
  };
}

export default function OpeningHoursPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: 'monday', dayFr: 'Lundi', isOpen: true, morning: { open: '08:00', close: '12:00' }, afternoon: { open: '14:00', close: '19:00' } },
    { day: 'tuesday', dayFr: 'Mardi', isOpen: true, morning: { open: '08:00', close: '12:00' }, afternoon: { open: '14:00', close: '19:00' } },
    { day: 'wednesday', dayFr: 'Mercredi', isOpen: true, morning: { open: '08:00', close: '12:00' }, afternoon: { open: '14:00', close: '19:00' } },
    { day: 'thursday', dayFr: 'Jeudi', isOpen: true, morning: { open: '08:00', close: '12:00' }, afternoon: { open: '14:00', close: '19:00' } },
    { day: 'friday', dayFr: 'Vendredi', isOpen: true, morning: { open: '08:00', close: '12:00' }, afternoon: { open: '14:00', close: '19:00' } },
    { day: 'saturday', dayFr: 'Samedi', isOpen: true, morning: { open: '08:00', close: '12:00' }, afternoon: { open: '', close: '' } },
    { day: 'sunday', dayFr: 'Dimanche', isOpen: false, morning: { open: '', close: '' }, afternoon: { open: '', close: '' } },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [isNightPharmacy, setIsNightPharmacy] = useState(false);

  const handleSave = () => {
    // Here you would typically save to your backend
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const updateSchedule = (index: number, updates: Partial<DaySchedule>) => {
    setSchedule(current =>
      current.map((day, i) => i === index ? { ...day, ...updates } : day)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Horaires d'ouverture</h1>
          <p className="mt-2 text-lg text-gray-600">
            Gérez les horaires d'ouverture de votre pharmacie
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center animate-fadeIn">
            <CheckCircle2 className="h-5 w-5 mr-3" />
            Horaires mis à jour avec succès
          </div>
        )}

        {/* Pharmacy Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Duty Status */}
            <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <Calendar className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Pharmacie de garde</h2>
                  <p className="text-gray-600">Indiquez si votre pharmacie est de garde</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isOnDuty}
                  onChange={(e) => setIsOnDuty(e.target.checked)}
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sky-500"></div>
              </label>
            </div>

            {/* Night Pharmacy Status */}
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <Moon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Pharmacie de nuit</h2>
                  <p className="text-gray-600">Indiquez si votre pharmacie est ouverte 24h/24</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isNightPharmacy}
                  onChange={(e) => setIsNightPharmacy(e.target.checked)}
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
              </label>
            </div>
          </div>

          {isNightPharmacy && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-xl flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Pharmacie de nuit</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  En tant que pharmacie de nuit, vous êtes tenu d'assurer un service 24h/24. 
                  Les horaires standards seront remplacés par une disponibilité continue.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Schedule Grid */}
        {!isNightPharmacy && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="space-y-6">
              {schedule.map((day, index) => (
                <div key={day.day} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-sky-100 p-2 rounded-lg">
                        <Clock className="h-5 w-5 text-sky-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{day.dayFr}</h3>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={day.isOpen}
                        onChange={(e) => updateSchedule(index, { isOpen: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900">
                        {day.isOpen ? 'Ouvert' : 'Fermé'}
                      </span>
                    </label>
                  </div>

                  {day.isOpen && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Morning Hours */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Sun className="h-5 w-5" />
                          <span className="text-sm font-medium">Matin</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ouverture
                            </label>
                            <input
                              type="time"
                              value={day.morning.open}
                              onChange={(e) => updateSchedule(index, {
                                morning: { ...day.morning, open: e.target.value }
                              })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fermeture
                            </label>
                            <input
                              type="time"
                              value={day.morning.close}
                              onChange={(e) => updateSchedule(index, {
                                morning: { ...day.morning, close: e.target.value }
                              })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Afternoon Hours */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Moon className="h-5 w-5" />
                          <span className="text-sm font-medium">Après-midi</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ouverture
                            </label>
                            <input
                              type="time"
                              value={day.afternoon.open}
                              onChange={(e) => updateSchedule(index, {
                                afternoon: { ...day.afternoon, open: e.target.value }
                              })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fermeture
                            </label>
                            <input
                              type="time"
                              value={day.afternoon.close}
                              onChange={(e) => updateSchedule(index, {
                                afternoon: { ...day.afternoon, close: e.target.value }
                              })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                 )} 
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={handleSave}
                className="w-full bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="h-5 w-5" />
                Enregistrer les modifications
              </button>
            </div>
          </div>
        )}

        {isNightPharmacy && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Moon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Horaires de service 24h/24</h2>
                <p className="text-gray-600">Votre pharmacie est enregistrée comme pharmacie de nuit</p>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl">
              <div className="flex items-center gap-3 text-indigo-700">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Ouvert 24 heures sur 24, 7 jours sur 7</span>
              </div>
              <p className="mt-2 text-indigo-600 text-sm">
                En tant que pharmacie de nuit, vous assurez un service continu pour répondre aux besoins d'urgence de la population.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={handleSave}
                className="w-full bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="h-5 w-5" />
                Confirmer le statut de pharmacie de nuit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}