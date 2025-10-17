import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  test('should merge class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })

  test('should handle conditional class names', () => {
    const result = cn('class1', false && 'class2', 'class3')
    expect(result).toBe('class1 class3')
  })

  test('should handle empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  test('should handle undefined and null inputs', () => {
    const result = cn('class1', undefined, null, 'class2')
    expect(result).toBe('class1 class2')
  })

  test('should handle object inputs', () => {
    const result = cn('class1', { class2: true, class3: false })
    expect(result).toBe('class1 class2')
  })

  test('should handle array inputs', () => {
    const result = cn(['class1', 'class2'])
    expect(result).toBe('class1 class2')
  })
})