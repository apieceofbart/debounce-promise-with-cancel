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

it('should check if debounce fn can be cancelled', async () => {
  const asyncCallback = async (value:any) => {
    await pause(10)
  };
  const resolved = spy()
  const result = debounce(asyncCallback, 10)
  result(1).then(resolved)
  await pause(15)
  result.cancel()
  await pause(15)
  expect(resolved).not.to.have.been.called
})

it('should check with async callback must be resolved only the last ', async () => {
  const asyncCallback = async (value:any) => {
    await pause(10)
  };
  const firstResolved = spy()
  const lastResolved = spy()
  const result = debounce(asyncCallback, 10)
  result(1).then(firstResolved)
  await pause(15)
  result(2).then(lastResolved)
  await pause(25)
  expect(firstResolved).not.to.have.been.called
  expect(lastResolved).to.have.been.called
})
