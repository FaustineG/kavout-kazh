import { dateDifference, formatDateForDatepicker, formatTimeForTimepicker } from './date'
import { describe, expect, it } from 'vitest'

describe('date helper', () => {
  describe('dateDifference', () => {
    it('should be a minute ago', () => {
      const old = '2024-01-01T12:00:00.000Z'
      const recent = '2024-01-01T12:01:00.000Z'
      expect(dateDifference(old, recent)).toEqual('1 minute')
    })

    it('should be a hour ago', () => {
      const old = '2024-01-01T12:00:00.000Z'
      const recent = '2024-01-01T13:00:00.000Z'
      expect(dateDifference(old, recent)).toEqual('1 heure')
    })

    it('should be two days ago', () => {
      const old = '2024-01-01T12:00:00.000Z'
      const recent = '2024-01-03T12:00:00.000Z'
      expect(dateDifference(old, recent)).toEqual('2 jours')
    })
  })

  describe('daetF', () => {
    it('should format date', () => {
      const timestamp = new Date('2024-03-01T13:00:00.000').toISOString()
      expect(formatDateForDatepicker(timestamp)).toEqual('2024-03-01')
    })
  })
  describe('formatTimeForTimepicker', () => {
    it('should format time', () => {
      const timestamp = new Date('2024-03-01T13:57:55.555').toISOString()
      expect(formatTimeForTimepicker(timestamp)).toEqual('13:57')
    })
  })
})
