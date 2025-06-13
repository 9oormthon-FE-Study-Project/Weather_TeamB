//날씨 지도 부분 구현
import React, {useState} from 'react'
import { useForm} from 'react-hook-form'

import { paths } from '../utils/paths'

  
const DEFAULT_FILL = '#E5E7EB'
const HOVER_FILL = '#A5B4FC'
const SELECTED_FILL = '#4F46E5'
const STROKE_COLOR = '#374151'


const MapForm = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { region: null } })

  const selectedRegion = watch('region')
  const [hoveredRegion, setHoveredRegion] = useState(null)

  const onSubmit = (data) => {
    alert(`선택된 지역: ${data.region}`)
  }

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)} 
    className="flex flex-col items-center justify-center min-h-screen gap-6 px-4"
    >
      {/* map 지도 부분 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 524 631" 
        aria-label="Map of South Korea"
        width={700}
        height={800}
        className="border border-gray-300"
      >
        {paths.map(({ id, name, d }) => (
          <path
            key={id}
            id={id}
            name={name}
            d={d}
            fill={
              selectedRegion === id
                ? SELECTED_FILL
                : hoveredRegion === id
                ? HOVER_FILL
                : DEFAULT_FILL
            }
            stroke={STROKE_COLOR}
            strokeWidth={1}
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => setHoveredRegion(id)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setValue('region', id)}
          />
        ))}
      </svg>

      {errors.region && <p className="error-text">{errors.region.message}</p>}

      <div className="text-6xl font-bold mb-4 text-center">
        선택한 지역:{' '}
        <strong>
          {selectedRegion
            ? paths.find((p) => p.id === selectedRegion)?.name || '알 수 없음'
            : '없음'}
        </strong>
      </div>

      
      
    </form>
  )
}

export default MapForm