"use client";

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Accommodation, type FormData } from '@/types';

interface AccommodationSelectorProps {
  accommodations: Accommodation[];
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

export function AccommodationSelector({ 
  accommodations, 
  formData, 
  updateFormData, 
  onNext 
}: AccommodationSelectorProps) {
  const handleAccommodationChange = (accommodationId: string) => {
    const selectedAccommodation = accommodations.find(acc => acc.id === accommodationId);
    if (selectedAccommodation) {
      updateFormData({ accommodation: selectedAccommodation });
    }
  };

  const getAccommodationTypeLabel = (type?: string) => {
    const typeLabels: { [key: string]: string } = {
      resort: 'Resort',
      pousada: 'Pousada',
      hotel: 'Hotel',
      eco_resort: 'Eco Resort'
    };
    return typeLabels[type || ''] || 'Hotel';
  };

  const getAccommodationTypeColor = (type?: string) => {
    const colors: { [key: string]: string } = {
      resort: 'bg-purple-100 text-purple-800',
      pousada: 'bg-green-100 text-green-800',
      hotel: 'bg-blue-100 text-blue-800',
      eco_resort: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type || ''] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {formData.accommodation ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🏨</span>
                  <div>
                    <p className="font-medium text-green-800">
                      {formData.accommodation.name}
                    </p>
                    <p className="text-sm text-green-600">
                      📍 {formData.accommodation.location}
                    </p>
                  </div>
                </div>
                <Badge 
                  className={`${getAccommodationTypeColor(formData.accommodation.type)} text-xs`}
                >
                  {getAccommodationTypeLabel(formData.accommodation.type)}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Select 
                  value={formData.accommodation.id} 
                  onValueChange={handleAccommodationChange}
                >
                  <SelectTrigger className="w-48 bg-white">
                    <SelectValue placeholder="Alterar hospedagem" />
                  </SelectTrigger>
                  <SelectContent>
                    {accommodations.map(accommodation => (
                      <SelectItem key={accommodation.id} value={accommodation.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{accommodation.name}</span>
                          <span className="text-xs text-gray-500">{accommodation.location}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={onNext} size="sm" className="bg-green-600 hover:bg-green-700">
                  Próximo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2588d6e2-61b2-4ce8-b9f2-6937c3b37c3b.png" 
              alt="Belos resorts e pousadas em paisagem paradisíaca tropical"
              className="rounded-lg shadow-md mx-auto mb-4 max-w-full h-auto"
            />
            <p className="text-gray-600">
              Escolha onde você ficará hospedado durante sua viagem
            </p>
          </div>

          <Select onValueChange={handleAccommodationChange}>
            <SelectTrigger className="w-full h-12 text-lg">
              <SelectValue placeholder="🏨 Selecione sua hospedagem..." />
            </SelectTrigger>
            <SelectContent>
              {accommodations.map(accommodation => (
                <SelectItem key={accommodation.id} value={accommodation.id}>
                  <div className="flex items-center space-x-3 py-2">
                    <span className="text-xl">🏨</span>
                    <div className="flex-1">
                      <div className="font-medium">{accommodation.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        📍 {accommodation.location}
                        <Badge 
                          className={`ml-2 ${getAccommodationTypeColor(accommodation.type)} text-xs`}
                        >
                          {getAccommodationTypeLabel(accommodation.type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {formData.accommodation && (
            <div className="text-center">
              <Button onClick={onNext} size="lg" className="bg-blue-600 hover:bg-blue-700">
                Continuar para Pessoas
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Accommodation Grid Preview */}
      {!formData.accommodation && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {accommodations.slice(0, 6).map(accommodation => (
            <Card 
              key={accommodation.id} 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
              onClick={() => handleAccommodationChange(accommodation.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🏨</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm leading-tight">
                        {accommodation.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        📍 {accommodation.location}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    className={`${getAccommodationTypeColor(accommodation.type)} text-xs w-fit`}
                  >
                    {getAccommodationTypeLabel(accommodation.type)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}