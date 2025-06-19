import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { fetchWeather } from '../apiTest/api'
import { paths } from '../utils/paths'

const MapForm = () => {
  const { handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { region: null },
  })
  const selectedRegion = watch('region')

  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  // ✅ 날씨 불러오는 함수: 가장 최신 시간의 T1H 값 추출
  const fetchAndSetWeather = async (regionName) => {
    try {
      setLoading(true)
      const data = await fetchWeather(regionName)

      // category가 T1H인 데이터 필터링
      const temperatureItems = data.filter((item) => item.category === 'T1H')

      // 가장 최근 시간 기준으로 정렬 후 가장 최신 값 선택
      const latestTemp = temperatureItems
        .sort((a, b) => b.fcstTime.localeCompare(a.fcstTime))[0]

      setWeatherInfo({
        T1H: latestTemp?.value ?? null,
      })
    } catch (err) {
      console.error('날씨 정보를 불러오지 못했습니다.', err)
      setWeatherInfo(null)
    } finally {
      setLoading(false)
    }
  }

  // ✅ 지역 선택 시 날씨 정보 불러오기
  useEffect(() => {
    if (!selectedRegion) return

    const regionName = paths.find((p) => p.id === selectedRegion)?.name
    if (!regionName) return

    fetchAndSetWeather(regionName)
  }, [selectedRegion])

  return (
    <form
      onSubmit={handleSubmit((data) =>
        alert(`선택된 지역: ${data.region}`)
      )}
      className="flex flex-col items-center justify-center min-h-screen gap-6 px-4"
    >
      {/* SVG 지도 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 524 631"
        width={700}
        height={800}
        className="border border-gray-300"
      >
        {paths.map(({ id, name, d }) => (
          <path
            key={id}
            d={d}
            fill={
              selectedRegion === id
                ? '#4F46E5'
                : hoveredRegion === id
                ? '#A5B4FC'
                : '#E5E7EB'
            }
            stroke="#374151"
            strokeWidth={1}
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => setHoveredRegion(id)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => {
              setValue('region', id)
            }}
          />
        ))}
      </svg>

      {/* 선택한 지역 텍스트 */}
      <div className="text-3xl font-bold text-center">
        선택한 지역:{' '}
        <strong>
          {selectedRegion
            ? paths.find((p) => p.id === selectedRegion)?.name
            : '없음'}
        </strong>
      </div>

      {/* 날씨 정보 출력 */}
      {loading && <p>날씨 정보를 불러오는 중...</p>}
      {weatherInfo && (
        <div className="text-3xl font-bold text-center">
          기온: {weatherInfo.T1H ?? '--'} °C
        </div>
      )}
    </form>
  )
}

export default MapForm
