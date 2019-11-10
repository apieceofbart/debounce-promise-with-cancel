import { debounce } from '../src/index'
import * as chai from 'chai'
import { spy } from 'sinon'
import 'mocha'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

const pause = (ms: number) => new Promise(res => setTimeout(res, ms))

it('should check if debounced fn exists', () => {
  const result = debounce(() => Promise.resolve(12))
  expect(result).to.exist
})

it('should check if debounced fn has cancel property', () => {
  const result = debounce(() => Promise.resolve(12))
  expect(result).to.have.property('cancel')
})

it('should check if debounced fn was called', async () => {
  const callback = spy()
  const result = debounce(callback, 20)
  result(42)
  await pause(20)
  expect(callback).to.have.been.calledWith(42)
})

it('should check if debounce fn was called only once', async () => {
  const callback = spy()
  const result = debounce(callback, 20)
  result(1)
  await pause(15)
  result(2)
  await pause(25)
  expect(callback).to.have.been.calledOnceWith(2)
})

it('should check if debounce fn can be cancelled', async () => {
  const callback = spy()
  const result = debounce(callback, 20)
  result(1)
  await pause(15)
  result.cancel()
  await pause(10)
  expect(callback).not.to.have.been.called
})
