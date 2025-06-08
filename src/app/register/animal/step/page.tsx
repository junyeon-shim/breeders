'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ImageFile extends File {
  preview?: string;
}

export default function AnimalStepRegister() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [species, setSpecies] = useState('');
  const [morphs, setMorphs] = useState<string[]>([]);
  const [size, setSize] = useState('baby');
  const [gender, setGender] = useState('unknown');
  const [weight, setWeight] = useState('');
  const [animalNumber, setAnimalNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetAnimation, setBottomSheetAnimation] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'species' | 'morph' | null>(null);
  const [tempSelectedSpecies, setTempSelectedSpecies] = useState('');
  const [tempSelectedMorphs, setTempSelectedMorphs] = useState<string[]>([]);

  const SPECIES = [
    { id: 'crested', name: '크레스티드 게코' },
    { id: 'leopard', name: '레오파드 게코' },
    { id: 'fat-tail', name: '펫테일 게코' },
    { id: 'gargoyle', name: '가고일 게코' },
    { id: 'chahoua', name: '차화게코' },
    { id: 'leachianus', name: '리키에너스' },
    { id: 'bearded-dragon', name: '비어디 드레곤' },
  ];

  const MORPHS: Record<string, { id: string; name: string; }[]> = {
    crested: [
      { id: 'normal', name: '노멀' },
      { id: 'lily-white', name: '릴리화이트' },
      { id: 'cappuccino', name: '카푸치노' },
      { id: 'frappuccino', name: '프라푸치노' },
      { id: 'sable', name: '세이블' },
      { id: 'lily-sable', name: '릴리 세이블' },
      { id: 'super-sable', name: '슈퍼 세이블' },
      { id: 'super-sable-lily', name: '슈퍼 세이블 릴리' },
      { id: 'axanthic', name: '아잔틱' },
      { id: 'lily-axanthic', name: '릴리 아잔틱' },
      { id: 'het-axanthic-100', name: '100% 헷아잔틱' },
      { id: 'lily-het-axanthic-100', name: '100% 릴리 헷아잔틱' },
      { id: 'choco', name: '초초' },
      { id: 'lily-choco', name: '릴리 초초' },
      { id: 'het-choco-100', name: '100% 헷초초' },
      { id: 'lily-het-choco-100', name: '100% 릴리 헷초초' },
      { id: 'hypo', name: '하이포' },
      { id: 'luwak', name: '루왁' },
      { id: 'luwak-lily', name: '루왁 릴리' },
      { id: 'tri', name: '트라이' },
      { id: 'extreme-harlequin', name: '익스트림 할리퀸' },
      { id: 'phantom', name: '팬텀' },
      { id: 'patternless', name: '패턴리스' },
      { id: 'bi', name: '바이' },
      { id: 'buckskin', name: '벅스킨' },
      { id: 'brindle', name: '브린들' },
      { id: 'harlequin', name: '할리퀸' },
      { id: 'tiger', name: '타이거' },
      { id: 'flame', name: '플레임' },
      { id: 'solid-back', name: '솔리드백' },
      { id: 'empty-back', name: '엠티백' },
      { id: 'super-stripe', name: '슈퍼 스트라이프' },
      { id: 'pin-stripe', name: '핀 스트라이프' },
      { id: 'full-pin', name: '풀핀' },
      { id: 'quad', name: '쿼드' },
      { id: 'white-pin', name: '화이트핀' },
      { id: 'dalmatian', name: '달마시안' },
      { id: 'super-dalmatian', name: '슈퍼 달마시안' },
      { id: 'drippy', name: '드리피' },
      { id: 'white-spot', name: '화이트 스팟' },
      { id: 'white-porthole', name: '화이트 포트홀' },
      { id: 'tangerine', name: '텐저린' },
      { id: 'halloween', name: '할로윈' },
      { id: 'charcoal', name: '차콜' },
      { id: 'dark', name: '다크' },
      { id: 'black', name: '블랙' },
      { id: 'cream', name: '크림' },
      { id: 'yellow', name: '옐로우' },
      { id: 'red', name: '레드' },
      { id: 'strawberry', name: '스트로베리' },
      { id: 'white', name: '화이트' },
      { id: 'white-wall', name: '화이트월' },
      { id: 'creamsicle', name: '크림시클' }
    ],
    leopard: [
      { id: 'galaxy', name: '갤럭시' },
      { id: 'ghost', name: '고스트' },
      { id: 'green', name: '그린' },
      { id: 'normal', name: '노멀' },
      { id: 'dark', name: '다크' },
      { id: 'devil', name: '데빌' },
      { id: 'diablo-blanco', name: '디아블로블랑코' },
      { id: 'lavender', name: '라벤더' },
      { id: 'raptor', name: '랩터' },
      { id: 'red', name: '레드' },
      { id: 'mandarin', name: '만다린' },
      { id: 'murphy-patternless', name: '머피 패턴리스' },
      { id: 'bell', name: '벨' },
      { id: 'bold', name: '볼드' },
      { id: 'black-knight', name: '블랙나이트' },
      { id: 'blood', name: '블러드' },
      { id: 'blazing-blizzard', name: '블레이징블리자드' },
      { id: 'blizzard', name: '블리자드' },
      { id: 'cipher', name: '사이퍼' },
      { id: 'sunrise', name: '선라이즈' },
      { id: 'sunset', name: '선셋' },
      { id: 'super-snow', name: '슈퍼스노우' },
      { id: 'super-hypo', name: '슈퍼하이포' },
      { id: 'snow', name: '스노우' },
      { id: 'stripe', name: '스트라이프' },
      { id: 'sunglow', name: '썬글로우' },
      { id: 'atomic', name: '아토믹' },
      { id: 'albino', name: '알비노' },
      { id: 'yellow', name: '옐로우' },
      { id: 'eclipse', name: '이클립스' },
      { id: 'inferno', name: '인페르노' },
      { id: 'electric', name: '일렉트릭' },
      { id: 'giant', name: '자이언트' },
      { id: 'jungle', name: '정글' },
      { id: 'carrot', name: '캐롯' },
      { id: 'tangerine', name: '텐저린' },
      { id: 'tremper-albino', name: '트램퍼알비노' },
      { id: 'halloween', name: '할로윈' },
      { id: 'white', name: '화이트' },
      { id: 'gg', name: 'GG' },
      { id: 'gt', name: 'GT' },
      { id: 'wy', name: 'W&Y' },
    ],
    'fat-tail': [
      { id: 'ghost', name: '고스트' },
      { id: 'normal', name: '노멀' },
      { id: 'super-zero', name: '슈퍼 제로' },
      { id: 'stinger', name: '스팅어' },
      { id: 'amelanistic', name: '아멜라니스틱' },
      { id: 'oreo', name: '오레오' },
      { id: 'zero', name: '제로' },
      { id: 'zulu', name: '줄루' },
      { id: 'caramel', name: '카라멜' },
      { id: 'patternless', name: '패턴리스' },
      { id: 'het-ghost', name: '헷 고스트' },
      { id: 'het-amelanistic', name: '헷 아멜라니스틱' },
      { id: 'het-oreo', name: '헷 오레오' },
      { id: 'het-zulu', name: '헷 줄루' },
      { id: 'het-caramel', name: '헷 카라멜' },
      { id: 'het-patternless', name: '헷 패턴리스' },
      { id: 'whiteout', name: '화이트아웃' },
    ],
    gargoyle: [
      { id: 'normal', name: '노멀' },
      { id: 'red', name: '레드' },
      { id: 'reticulated', name: '레티큘' },
      { id: 'bacon', name: '베이컨' },
      { id: 'blotched', name: '블로치드' },
      { id: 'skeleton', name: '스켈레톤' },
      { id: 'stripe', name: '스트라이프' },
      { id: 'yellow', name: '옐로우' },
      { id: 'orange', name: '오렌지' },
      { id: 'white', name: '화이트' },
    ],
    chahoua: [
      { id: 'green', name: '그린' },
      { id: 'normal', name: '노멀' },
      { id: 'red', name: '레드' },
      { id: 'mainland', name: '메인랜드' },
      { id: 'orange', name: '오렌지' },
      { id: 'pine-island', name: '파인아일랜드' },
      { id: 'pink', name: '핑크' },
      { id: 'high-color', name: '하이 컬러' },
      { id: 'white-solter', name: '화이트솔터' },
      { id: 'white-kara', name: '화이트카라' },
    ],
    leachianus: [
      { id: 'normal', name: '노멀' },
      { id: 'nuana', name: '누아나' },
      { id: 'nuami', name: '누아미' },
      { id: 'dasmol', name: '다스몰' },
      { id: 'dark', name: '다크' },
      { id: 'red-bar', name: '레드바' },
      { id: 'lieberman', name: '리버만' },
      { id: 'leaping-leachies', name: '리핀리치스' },
      { id: 'melanistic', name: '멜라니스틱' },
      { id: 'moro', name: '모로' },
      { id: 'broths', name: '브로쓰' },
      { id: 'yate', name: '야떼' },
      { id: 'kanawa', name: '카나와' },
      { id: 'cokis', name: '코키스' },
      { id: 'troeger', name: '트로거' },
      { id: 'true-color', name: '트루 컬러' },
      { id: 'pine-island', name: '파인아일랜드' },
      { id: 'poindimie', name: '포인디미에' },
      { id: 'friedel', name: '프리델' },
      { id: 'high-color', name: '하이 컬러' },
      { id: 'hagito', name: '하기토' },
      { id: 'het-melanistic', name: '헷 멜라니스틱' },
      { id: 'gt', name: 'GT' },
      { id: 'gtx', name: 'GTX' },
      { id: 'type-a', name: 'Type A' },
    ],
    'bearded-dragon': [
      { id: 'normal', name: '노멀' },
      { id: 'dark-red', name: '다크 레드' },
      { id: 'dunner', name: '더너' },
      { id: 'leather', name: '레더' },
      { id: 'red', name: '레드' },
      { id: 'citrus', name: '시트러스' },
      { id: 'silky', name: '실키' },
      { id: 'thunderbolt', name: '썬더볼트' },
      { id: 'albino', name: '알비노' },
      { id: 'orange', name: '오렌지' },
      { id: 'witblit', name: '윗블릿' },
      { id: 'genetic-stripe', name: '제네틱 스트라이프' },
      { id: 'zero', name: '제로' },
      { id: 'translucent', name: '트랜슬' },
      { id: 'hypo', name: '하이포' },
    ],
  };

  const SIZES = [
    { id: 'baby', name: '베이비' },
    { id: 'juvenile', name: '아성체' },
    { id: 'sub-adult', name: '준성체' },
    { id: 'adult', name: '성체' },
  ];

  const GENDERS = [
    { id: 'unknown', name: '미구분' },
    { id: 'female', name: '암컷' },
    { id: 'male', name: '수컷' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 10) {
      alert('이미지는 최대 10개까지 업로드할 수 있습니다.');
      return;
    }

    const newImages = files.map(file => {
      const imageFile = file as ImageFile;
      imageFile.preview = URL.createObjectURL(file);
      return imageFile;
    });

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview!);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const openBottomSheet = (type: 'species' | 'morph') => {
    if (type === 'morph' && !species) {
      setSelectedFilter('species');
    } else {
      setSelectedFilter(type);
    }
    setTempSelectedSpecies(species);
    setTempSelectedMorphs([...morphs]);
    setIsBottomSheetOpen(true);
    setTimeout(() => setBottomSheetAnimation(true), 50);
  };

  const closeBottomSheet = () => {
    setBottomSheetAnimation(false);
    setTimeout(() => {
      setIsBottomSheetOpen(false);
      setSelectedFilter(null);
    }, 300);
  };

  const handleSpeciesSelect = (id: string) => {
    setTempSelectedSpecies(id);
    setTempSelectedMorphs([]);
    setSelectedFilter('morph');
  };

  const handleMorphSelect = (id: string) => {
    setTempSelectedMorphs(prev => {
      if (prev.includes(id)) {
        return prev.filter(m => m !== id);
      }
      if (prev.length < 6) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleApplyFilter = () => {
    setSpecies(tempSelectedSpecies);
    setMorphs(tempSelectedMorphs);
    closeBottomSheet();
  };

  const resetFilter = () => {
    setTempSelectedSpecies('');
    setTempSelectedMorphs([]);
    if (selectedFilter === 'morph') {
      setSelectedFilter('species');
    }
  };

  const getSpeciesName = (id: string) => {
    return SPECIES.find(s => s.id === id)?.name || '';
  };

  const getMorphNames = (ids: string[]) => {
    if (!species || !MORPHS[species]) return '';
    return ids.map(id => MORPHS[species].find(m => m.id === id)?.name || '').join(', ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 폼 제출 로직 구현
    console.log({
      images,
      species,
      morphs,
      size,
      gender,
      weight,
      animalNumber,
      description,
    });
    router.push('/');
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit(new Event('submit') as any);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return images.length > 0 && species && morphs.length > 0;
      case 2:
        return size !== '';
      case 3:
        return gender !== '';
      case 4:
        return true; // 선택적 필드들이므로 항상 진행 가능
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">사진 등록</h2>
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image.preview!}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {images.length < 10 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400"
                  >
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-sm text-gray-500">최대 10개까지 업로드 가능</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">종/모프 선택</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  종 <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => openBottomSheet('species')}
                  className="w-full px-4 py-3 text-left text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {species ? getSpeciesName(species) : '선택해주세요'}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  모프 <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => openBottomSheet('morph')}
                  className="w-full px-4 py-3 text-left text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {morphs.length > 0 ? getMorphNames(morphs) : '선택해주세요'}
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">크기 선택</h2>
            <div className="grid grid-cols-2 gap-3">
              {SIZES.map((option) => (
                <label
                  key={option.id}
                  className={`radio-card ${
                    size === option.id
                      ? 'radio-card-active'
                      : 'radio-card-inactive'
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={option.id}
                    checked={size === option.id}
                    onChange={() => setSize(option.id)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{option.name}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">성별 선택</h2>
            <div className="grid grid-cols-3 gap-3">
              {GENDERS.map((option) => {
                const isDisabled = option.id === 'unknown' && ['sub-adult', 'adult'].includes(size);
                return (
                  <label
                    key={option.id}
                    className={`radio-card ${
                      isDisabled
                        ? 'radio-card-disabled'
                        : gender === option.id
                          ? 'radio-card-active'
                          : 'radio-card-inactive'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option.id}
                      checked={gender === option.id}
                      onChange={() => !isDisabled && setGender(option.id)}
                      disabled={isDisabled}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{option.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">추가 정보</h2>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                체중
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="weight"
                  value={weight}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (value === '') {
                      setWeight('');
                    } else {
                      setWeight(value);
                    }
                  }}
                  placeholder="체중을 입력해주세요"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-gray-500">g</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="animalNumber" className="block text-sm font-medium text-gray-700 mb-2">
                개체 관리번호
              </label>
              <input
                type="text"
                id="animalNumber"
                value={animalNumber}
                onChange={(e) => setAnimalNumber(e.target.value)}
                placeholder="개체 관리번호를 입력해주세요"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="개체에 대한 설명을 입력해주세요"
                maxLength={600}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="mt-2 text-sm text-gray-500 text-right">
                {description.length}/600
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-[10] h-16 bg-white border-b border-gray-200">
        <div className="flex h-full items-center justify-between px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">개체 등록</h1>
          <div className="w-10" /> {/* Placeholder for alignment */}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed inset-x-0 top-16 z-[9] h-1 bg-gray-200">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="pt-20 pb-24">
        <div className="p-4">
          {renderStep()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 z-[10] bg-white border-t border-gray-200">
        <div className="p-4 flex gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className={`flex-1 py-3 px-4 rounded-lg ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            disabled={currentStep === 1}
          >
            이전
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 py-3 px-4 rounded-lg ${
              canProceed()
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === 4 ? '등록' : '다음'}
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      {isBottomSheetOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-[98]"
            style={{ opacity: bottomSheetAnimation ? 0.25 : 0 }}
            onClick={closeBottomSheet}
          />
          <div 
            className={`fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-in-out z-[99] ${
              bottomSheetAnimation ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">
                {selectedFilter === 'species' ? '종 선택' : '모프 선택'}
              </h2>
              <button
                onClick={closeBottomSheet}
                className="text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 max-h-[calc(60vh-80px)] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {selectedFilter === 'species' ? (
                  SPECIES.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSpeciesSelect(option.id)}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        option.id === tempSelectedSpecies
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))
                ) : (
                  MORPHS[tempSelectedSpecies]?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleMorphSelect(option.id)}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        tempSelectedMorphs.includes(option.id)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))
                )}
              </div>
            </div>
            <div className="flex gap-3 p-4 border-t pb-8">
              <button
                onClick={resetFilter}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
              >
                초기화
              </button>
              {selectedFilter === 'morph' && (
                <button
                  onClick={handleApplyFilter}
                  className="flex-1 py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                  선택 완료
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 