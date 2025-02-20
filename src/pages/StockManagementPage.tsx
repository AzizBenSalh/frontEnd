import React, { useState, useRef } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
  Package,
  Euro
} from 'lucide-react';

interface Medicament {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  imageFile?: File;
  category: string;
  lastUpdated: string;
}

const MEDICATION_CATEGORIES = [
  'Analgésiques',
  'Antibiotiques',
  'Antihistaminiques',
  'Antidépresseurs',
  'Anti-inflammatoires',
  'Antihypertenseurs',
  'Antidiabétiques',
  'Anticoagulants',
  'Antiacides',
  'Anxiolytiques',
  'Bronchodilatateurs',
  'Contraceptifs',
  'Corticostéroïdes',
  'Dermatologiques',
  'Diurétiques',
  'Hormones',
  'Immunosuppresseurs',
  'Ophtalmologiques',
  'Psychotropes',
  'Vitamines et Minéraux'
].sort();

export default function StockManagementPage() {
  const [medicaments, setMedicaments] = useState<Medicament[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMed, setEditingMed] = useState<Medicament | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (med: Medicament) => {
    setEditingMed(med);
    setIsAddingNew(false);
    setImageUrl(med.image);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médicament ?')) {
      setMedicaments(meds => meds.filter(med => med.id !== id));
      // Vous pouvez également appeler l'API DELETE ici
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setEditingMed(prev => prev ? { ...prev, image: url, imageFile: file } : null);
    }
  };

  const handleImageUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl) {
      setEditingMed(prev => prev ? { ...prev, image: imageUrl } : null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMed) return;

    if (isAddingNew) {
      // Préparez l'objet à envoyer (le backend générera l'id)
      const newMed = {
        name: editingMed.name,
        price: editingMed.price,
        stock: editingMed.stock,
        description: editingMed.description,
        image: editingMed.image,
        category: editingMed.category,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      try {
        const response = await fetch('http://localhost:3000/api/medications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMed)
        });
        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du médicament');
        }
        const data = await response.json();
        // On suppose que l'API renvoie { medication: { ... } }
        setMedicaments(meds => [...meds, data.medication]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setEditingMed(null);
        setIsAddingNew(false);
        setImageUrl('');
      } catch (error) {
        console.error(error);
        alert('Erreur lors de l\'ajout du médicament');
      }
    } else {
      // Ici vous pouvez gérer la modification d'un médicament (via un PUT par exemple)
      setMedicaments(meds =>
        meds.map(med => (med.id === editingMed.id ? editingMed : med))
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setEditingMed(null);
      setIsAddingNew(false);
      setImageUrl('');
    }
  };

  const filteredMeds = medicaments.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Gestion des stocks</h1>
          <p className="mt-2 text-lg text-gray-600">
            Gérez votre inventaire de médicaments et mettez à jour les informations
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center animate-fadeIn">
            <CheckCircle2 className="h-5 w-5 mr-3" />
            Modifications enregistrées avec succès
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un médicament ou une catégorie..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                // Initialisez l'objet pour l'ajout
                setEditingMed({
                  id: '',
                  name: '',
                  price: 0,
                  stock: 0,
                  description: '',
                  image: '',
                  category: '',
                  lastUpdated: new Date().toISOString().split('T')[0]
                });
                setIsAddingNew(true);
                setImageUrl('');
              }}
              className="bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Ajouter un médicament
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-${editingMed || isAddingNew ? '2' : '3'} space-y-4`}>
            {filteredMeds.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
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
                        <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm mt-1">
                          {med.category}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(med)}
                          className="p-2 text-gray-600 hover:text-sky-500 transition-colors"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(med.id)}
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-600">
                        <Package className="h-4 w-4 mr-2" />
                        <span>Stock: {med.stock}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Euro className="h-4 w-4 mr-2" />
                        <span>{med.price.toFixed(2)} DT</span>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{med.description}</p>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      Dernière mise à jour: {med.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(editingMed || isAddingNew) && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {isAddingNew ? 'Ajouter un médicament' : 'Modifier le médicament'}
                </h3>

                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du médicament
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMed?.name || ''}
                      onChange={(e) => setEditingMed(prev => ({ ...prev!, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix (DT)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={editingMed?.price || ''}
                        onChange={(e) => setEditingMed(prev => ({ ...prev!, price: parseFloat(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock
                      </label>
                      <input
                        type="number"
                        required
                        value={editingMed?.stock || ''}
                        onChange={(e) => setEditingMed(prev => ({ ...prev!, stock: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      required
                      value={editingMed?.category || ''}
                      onChange={(e) => setEditingMed(prev => ({ ...prev!, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      {MEDICATION_CATEGORIES.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      required
                      value={editingMed?.description || ''}
                      onChange={(e) => setEditingMed(prev => ({ ...prev!, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image
                    </label>
                    
                    {imageUrl && (
                      <div className="mb-4">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 hover:border-sky-400 hover:bg-sky-50"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Cliquez pour télécharger une image depuis votre ordinateur
                        </p>
                      </div>

                      <div>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Ou entrez une URL d'image..."
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-500 focus:ring focus:ring-sky-100"
                          />
                          <button
                            type="button"
                            onClick={handleImageUrlSubmit}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                          >
                            Utiliser
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMed(null);
                        setIsAddingNew(false);
                        setImageUrl('');
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
