import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import '../styles/MapPage.css'
import { paths } from '../data/Path.js'
  
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
    <form onSubmit={handleSubmit(onSubmit)} className="map-form">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 524 631"
        aria-label="Map of South Korea"
        width={400}
        height={500}
        style={{ border: '1px solid #ddd' }}
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
            style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }}
            onMouseEnter={() => setHoveredRegion(id)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setValue('region', id)}
          />
        ))}
      </svg>

      {errors.region && <p className="error-text">{errors.region.message}</p>}

      <div style={{ marginTop: 16 }}>
        선택된 지역:{' '}
        <strong>
          {selectedRegion
            ? paths.find((p) => p.id === selectedRegion)?.name || '알 수 없음'
            : '없음'}
        </strong>
      </div>

      <button type="submit" className="submit-button" style={{ marginTop: 16 }}>
        제출
      </button>
    </form>
  )
}

export default MapForm