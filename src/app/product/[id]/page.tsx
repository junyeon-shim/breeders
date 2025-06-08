'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const router = useRouter();
  
  // 임시 상품 데이터
  const product = {
    id: parseInt(params.id),
    name: '릴리화이트 세이블',
    price: '380,000원',
    image: '/images/geckos/crested-1.jpg',
    description: '건강하고 활발한 크레스티드 게코입니다. 먹이활동이 왕성하며 무늬가 선명합니다. 온도와 습도 관리가 잘 되어있는 환경에서 키워졌으며, 정기적인 건강검진을 받았습니다. 초보 브리더도 쉽게 키울 수 있습니다.',
    category: '크레스티드 게코',
    breeder: {
      name: '파충류마을',
      shopName: '파충류마을 신촌점',
      profile: '/images/profile-placeholder.jpg'
    },
    animal: {
      species: '크레스티드 게코',
      morphs: ['릴리화이트', '세이블'],
      size: '아성체',
      gender: '암컷',
      hatchDate: '2023-08-15',
      weight: '35g',
      name: 'Lucy'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="h-14 flex items-center px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-14 pb-20">
        {/* Product Image */}
        <div className="relative w-full h-80">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="px-4 py-6">
          <div className="mb-6">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-indigo-600">
              {product.price}
            </p>
          </div>

          {/* Seller Info */}
          <div className="py-6 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">판매자 정보</h2>
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={product.breeder.profile}
                  alt={product.breeder.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">
                  {product.breeder.name}
                </p>
                <p className="text-sm text-gray-500">
                  {product.breeder.shopName}
                </p>
              </div>
            </div>
          </div>

          {/* Animal Info */}
          <div className="py-6 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">개체 정보</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">종</span>
                <span className="font-medium text-gray-900">{product.animal.species}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">모프</span>
                <span className="font-medium text-gray-900">{product.animal.morphs.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">크기</span>
                <span className="font-medium text-gray-900">{product.animal.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">성별</span>
                <span className="font-medium text-gray-900">{product.animal.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">해칭일</span>
                <span className="font-medium text-gray-900">{product.animal.hatchDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">체중</span>
                <span className="font-medium text-gray-900">{product.animal.weight}</span>
              </div>
              {product.animal.name && (
                <div className="flex justify-between">
                  <span className="text-gray-600">이름</span>
                  <span className="font-medium text-gray-900">{product.animal.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className="py-6 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">상품 설명</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          구매하기
        </button>
      </div>
    </div>
  );
} 