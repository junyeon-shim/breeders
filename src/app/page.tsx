'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FilterOption {
  id: string;
  name: string;
  disabled?: boolean;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  breeder: string;
  species: string;
  morphs: string[];
  size: string;
  gender: string;
}

const SPECIES: FilterOption[] = [
  { id: 'crested', name: '크레스티드 게코' },
  { id: 'leopard', name: '레오파드 게코' },
  { id: 'fat-tail', name: '펫테일 게코' },
  { id: 'gargoyle', name: '가고일 게코' },
  { id: 'chahoua', name: '차화게코' },
  { id: 'leachianus', name: '리키에너스' },
  { id: 'bearded-dragon', name: '비어디 드레곤' },
];

const MORPHS: Record<string, FilterOption[]> = {
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

const SIZES: FilterOption[] = [
  { id: 'baby', name: '베이비' },
  { id: 'juvenile', name: '아성체' },
  { id: 'sub-adult', name: '준성체' },
  { id: 'adult', name: '성체' },
];

const GENDERS: FilterOption[] = [
  { id: 'unknown', name: '미구분' },
  { id: 'female', name: '암컷' },
  { id: 'male', name: '수컷' },
];

const FILTER_CHIPS = [
  { id: 'species', name: '종류' },
  { id: 'morph', name: '모프' },
  { id: 'size', name: '크기' },
  { id: 'gender', name: '성별' },
  { id: 'price', name: '가격' },
  { id: 'location', name: '지역' },
  { id: 'breeder', name: '브리더' },
];

// 상품 데이터 생성 함수
const generateRandomMorphs = (species: string, count: number = Math.floor(Math.random() * 4) + 2): string[] => {
  if (species !== 'crested') return ['normal'];
  
  const availableMorphs = MORPHS.crested.map(m => m.id);
  const selectedMorphs = new Set<string>();
  
  // 최소 2개, 최대 6개의 모프 선택
  const targetCount = Math.min(Math.max(count, 2), 6);
  
  while (selectedMorphs.size < targetCount) {
    const randomMorph = availableMorphs[Math.floor(Math.random() * availableMorphs.length)];
    selectedMorphs.add(randomMorph);
  }
  
  return Array.from(selectedMorphs);
};

const getMorphNames = (morphIds: string[]): string => {
  return morphIds
    .map(id => MORPHS.crested.find(m => m.id === id)?.name || '노멀')
    .join(' ');
};

// 종류 이름 가져오기 함수 추가
const getSpeciesName = (speciesId: string): string => {
  return SPECIES.find(s => s.id === speciesId)?.name || '';
};

// 모프 이름 표시 함수 수정
const getMorphDisplayName = (morphIds: string[]): string => {
  if (morphIds.length === 0) return '';
  const firstMorph = MORPHS.crested.find(m => m.id === morphIds[0])?.name || '노멀';
  return morphIds.length > 1 ? `${firstMorph} 외 +${morphIds.length - 1}개` : firstMorph;
};

// 성별과 크기 표시 함수 추가
const getSizeText = (sizeId: string): string => {
  return SIZES.find(s => s.id === sizeId)?.name || '';
};

const getGenderText = (genderId: string): string => {
  return GENDERS.find(g => g.id === genderId)?.name || '';
};

// 초기 상품 데이터를 별도의 파일로 분리
const initialProducts: Product[] = [
  {
    id: 1,
    name: '릴리화이트 세이블',
    price: '380,000원',
    image: '/images/geckos/crested-1.jpg',
    description: '건강한 크레스티드 게코입니다.',
    breeder: '파충류마을',
    species: 'crested',
    morphs: ['lily-white', 'sable'],
    size: 'juvenile',
    gender: 'unknown',
  },
  // 29개의 추가 크레스티드 게코 데이터 생성
  ...Array.from({ length: 29 }, (_, i) => {
    const id = i + 2;
    const size = SIZES[Math.floor(Math.random() * SIZES.length)];
    const gender = size.id === 'baby' ? GENDERS[0] : GENDERS[Math.floor(Math.random() * GENDERS.length)];
    const morphs = generateRandomMorphs('crested');
    const price = Math.floor(Math.random() * 10 + 15) * 50000;
    
    const name = getMorphNames(morphs);
    
    // 로컬 이미지 경로 배열
    const imageUrls = [
      '/images/geckos/crested-1.jpg',
      '/images/geckos/crested-2.jpg',
      '/images/geckos/crested-3.jpg',
      '/images/geckos/crested-4.jpg',
      '/images/geckos/crested-5.jpg'
    ];
    
    return {
      id,
      name,
      price: price.toLocaleString() + '원',
      image: imageUrls[Math.floor(Math.random() * imageUrls.length)],
      description: '건강한 크레스티드 게코입니다.',
      breeder: ['파충류마을', '게코월드', '게코하우스', '드래곤브리더스'][Math.floor(Math.random() * 4)],
      species: 'crested',
      morphs,
      size: size.id,
      gender: gender.id,
    };
  }),
];

type FilterType = 'species' | 'morph' | 'size' | 'gender';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedMorphs, setSelectedMorphs] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetAnimation, setBottomSheetAnimation] = useState(false);
  const router = useRouter();
  const [tempSelectedSpecies, setTempSelectedSpecies] = useState('');
  const [tempSelectedMorphs, setTempSelectedMorphs] = useState<string[]>([]);
  const [tempSelectedSize, setTempSelectedSize] = useState('');
  const [tempSelectedGender, setTempSelectedGender] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLeftPopoverOpen, setIsLeftPopoverOpen] = useState(false);

  // 상품 추가 함수
  const addProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, { ...newProduct, id: prev.length + 1 }]);
  };

  // 필터링된 제품 목록
  const filteredProducts = products.filter(product => {
    // 크레스티드 게코가 아니면 제외
    if (product.species !== 'crested') return false;

    // 종류가 선택되지 않았거나, 크레스티드 게코가 선택되었지만 모프가 선택되지 않은 경우
    // 모든 크레스티드 게코 표시
    if (!selectedSpecies || (selectedSpecies === 'crested' && selectedMorphs.length === 0)) {
      // 크기와 성별 필터는 계속 적용
      if (selectedSize && product.size !== selectedSize) return false;
      if (selectedGender && product.gender !== selectedGender) return false;
      return true;
    }
    
    // 선택된 종류가 크레스티드 게코가 아니면 제외
    if (selectedSpecies !== 'crested') return false;

    // 모프가 선택된 경우, 선택된 모프 중 하나라도 포함되어 있어야 함
    if (!selectedMorphs.some(morph => product.morphs.includes(morph))) return false;

    // 크기 필터
    if (selectedSize && product.size !== selectedSize) return false;
    
    // 성별 필터
    if (selectedGender && product.gender !== selectedGender) return false;
    
    return true;
  });

  // 필터 선택 처리 수정
  const handleFilterSelect = (value: string) => {
    switch (selectedFilter) {
      case 'species':
        if (value === tempSelectedSpecies) {
          setTempSelectedSpecies('');
          setTempSelectedMorphs([]);
        } else {
          setTempSelectedSpecies(value);
          setSelectedFilter('morph'); // 종 선택 후 바로 모프 선택으로 이동
        }
        break;
      case 'morph':
        if (tempSelectedMorphs.includes(value)) {
          setTempSelectedMorphs(tempSelectedMorphs.filter(m => m !== value));
        } else if (tempSelectedMorphs.length < 6) {
          setTempSelectedMorphs([...tempSelectedMorphs, value]);
        }
        break;
      case 'size':
        setTempSelectedSize(value === tempSelectedSize ? '' : value);
        if (['sub-adult', 'adult'].includes(value) && tempSelectedGender === 'unknown') {
          setTempSelectedGender('');
        }
        break;
      case 'gender':
        setTempSelectedGender(value === tempSelectedGender ? '' : value);
        break;
    }
  };

  // 선택된 필터에 따른 옵션 목록
  const getFilterOptions = () => {
    switch (selectedFilter) {
      case 'species':
        return SPECIES;
      case 'morph':
        return MORPHS[tempSelectedSpecies] || [];
      case 'size':
        return SIZES;
      case 'gender':
        return GENDERS.map(gender => ({
          ...gender,
          disabled: gender.id === 'unknown' && ['sub-adult', 'adult'].includes(selectedSize)
        }));
      default:
        return [];
    }
  };

  // 필터 초기화 함수 수정
  const resetFilter = (type?: FilterType) => {
    if (type) {
      switch (type) {
        case 'species':
          setSelectedSpecies('');
          setSelectedMorphs([]);
          break;
        case 'morph':
          setSelectedMorphs([]);
          setSelectedFilter('species'); // 모프 초기화 시 종 선택으로 이동
          break;
        case 'size':
          setSelectedSize('');
          break;
        case 'gender':
          setSelectedGender('');
          break;
      }
    } else {
      setTempSelectedSpecies('');
      setTempSelectedMorphs([]);
      setTempSelectedSize('');
      setTempSelectedGender('');
      if (selectedFilter === 'morph') {
        setSelectedFilter('species'); // 바텀시트에서 모프 초기화 시 종 선택으로 이동
      }
    }
  };

  const handleResetFilter = (e: React.MouseEvent, type: FilterType) => {
    e.stopPropagation();
    resetFilter(type);
  };

  // 필터 적용
  const handleApplyFilter = () => {
    setSelectedSpecies(tempSelectedSpecies);
    setSelectedMorphs(tempSelectedMorphs);
    setSelectedSize(tempSelectedSize);
    setSelectedGender(tempSelectedGender);
    closeBottomSheet();
  };

  // Bottom Sheet 열 때 임시 상태 설정
  const openBottomSheet = (filterId: string) => {
    if (filterId === 'morph' && !selectedSpecies) {
      setSelectedFilter('species');
    } else {
      setSelectedFilter(filterId);
    }
    // 임시 상태를 현재 선택된 값으로 설정
    setTempSelectedSpecies(selectedSpecies);
    setTempSelectedMorphs([...selectedMorphs]);
    setTempSelectedSize(selectedSize);
    setTempSelectedGender(selectedGender);
    setIsBottomSheetOpen(true);
    setTimeout(() => setBottomSheetAnimation(true), 50);
  };

  const closeBottomSheet = () => {
    setBottomSheetAnimation(false);
    setTimeout(() => {
      setIsBottomSheetOpen(false);
      setSelectedFilter('');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <svg 
                  className="h-8 w-8 text-indigo-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900">파충류샵</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col h-screen">
        {/* Filter Section */}
        <div className="fixed top-16 left-0 right-0 z-40 bg-white">
          <div className="mx-auto max-w-3xl px-4">
            <div className="flex overflow-x-auto py-4 no-scrollbar">
              <div className="flex space-x-2 px-0.5">
                {FILTER_CHIPS.map((chip) => {
                  const isSelected = (() => {
                    switch (chip.id) {
                      case 'species': return !!selectedSpecies;
                      case 'morph': return selectedMorphs.length > 0;
                      case 'size': return !!selectedSize;
                      case 'gender': return !!selectedGender;
                      default: return false;
                    }
                  })();

                  const selectedValue = (() => {
                    switch (chip.id) {
                      case 'species': return SPECIES.find(s => s.id === selectedSpecies)?.name;
                      case 'morph': return getMorphDisplayName(selectedMorphs);
                      case 'size': return SIZES.find(s => s.id === selectedSize)?.name;
                      case 'gender': return GENDERS.find(g => g.id === selectedGender)?.name;
                      default: return '';
                    }
                  })();

                  return (
                    <button
                      key={chip.id}
                      onClick={() => openBottomSheet(chip.id)}
                      className={`inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-inset ${
                        isSelected
                          ? 'bg-indigo-600 text-white ring-indigo-600'
                          : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="whitespace-nowrap">{chip.name}</span>
                      {isSelected && selectedValue && (
                        <>
                          <span className="mx-2">: {selectedValue}</span>
                          <button
                            onClick={(e) => handleResetFilter(e, chip.id as FilterType)}
                            className="ml-1 rounded-full p-1 hover:bg-indigo-500"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto pt-32 pb-20 px-4">
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="group relative overflow-hidden"
                >
                  <div className="relative w-full pb-[100%]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="py-2">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {getSpeciesName(product.species)}
                      </span>
                    </div>
                    <h3 className="text-base leading-[22px] font-medium text-gray-900 line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <div className="text-sm text-gray-500 mb-2">
                      {getGenderText(product.gender)} | {getSizeText(product.size)}
                    </div>
                    <p className="text-base leading-[26px] font-semibold text-indigo-600">
                      {product.price}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Sheet */}
      {isBottomSheetOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-[60]"
            style={{ opacity: bottomSheetAnimation ? 0.25 : 0 }}
            onClick={closeBottomSheet}
          />
          <div 
            className={`fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-in-out pb-16 z-[61] ${
              bottomSheetAnimation ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">
                {FILTER_CHIPS.find(chip => chip.id === selectedFilter)?.name}
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
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {selectedFilter === 'morph' && !tempSelectedSpecies ? (
                <div className="text-center py-8 text-gray-500">
                  종류를 먼저 선택해주세요
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {getFilterOptions().map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleFilterSelect(option.id)}
                      disabled={option.disabled}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        option.disabled
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : (() => {
                              const isSelected = (() => {
                                switch (selectedFilter) {
                                  case 'species': return option.id === tempSelectedSpecies;
                                  case 'morph': return tempSelectedMorphs.includes(option.id);
                                  case 'size': return option.id === tempSelectedSize;
                                  case 'gender': return option.id === tempSelectedGender;
                                  default: return false;
                                }
                              })();
                              return isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200';
                            })()
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-3">
              <button
                onClick={() => resetFilter()}
                className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
              >
                초기화
              </button>
              <button
                onClick={handleApplyFilter}
                className="flex-1 py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                적용
              </button>
            </div>
          </div>
        </>
      )}

      {/* Floating Action Buttons & Popover */}
      <div className="fixed right-4 bottom-20 z-50">
        {isPopoverOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/25 z-[70]"
              onClick={() => setIsPopoverOpen(false)}
            />
            <div className="absolute bottom-16 right-0 w-[180px] bg-white rounded-lg shadow-lg overflow-hidden z-[71]">
              <div className="py-2">
                <button
                  onClick={() => {
                    router.push('/register/animal');
                    setIsPopoverOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  개체 등록
                </button>
                <button
                  onClick={() => {
                    router.push('/register/product');
                    setIsPopoverOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  상품 등록
                </button>
              </div>
            </div>
          </>
        )}
        <button
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className="h-14 w-14 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
        >
          {isPopoverOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {/* Left Floating Action Button & Popover */}
      <div className="fixed left-4 bottom-20 z-50">
        {isLeftPopoverOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/25 z-[70]"
              onClick={() => setIsLeftPopoverOpen(false)}
            />
            <div className="absolute bottom-16 left-0 w-[180px] bg-white rounded-lg shadow-lg overflow-hidden z-[71]">
              <div className="py-2">
                <button
                  onClick={() => {
                    router.push('/register/animal/step');
                    setIsLeftPopoverOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  개체 등록 (단계별)
                </button>
                <button
                  onClick={() => {
                    router.push('/register/product/step');
                    setIsLeftPopoverOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  상품 등록 (단계별)
                </button>
              </div>
            </div>
          </>
        )}
        <button
          onClick={() => setIsLeftPopoverOpen(!isLeftPopoverOpen)}
          className="h-14 w-14 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
        >
          {isLeftPopoverOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl h-16">
          <div className="grid h-full grid-cols-3">
            <button className="flex flex-col items-center justify-center text-indigo-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="mt-1 text-xs font-medium">홈</span>
            </button>
            <button className="flex flex-col items-center justify-center text-gray-500">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="mt-1 text-xs font-medium">검색</span>
            </button>
            <button className="flex flex-col items-center justify-center text-gray-500">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="mt-1 text-xs font-medium">프로필</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
