// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Web Workers for Jest
global.Worker = class MockWorker {
  constructor() {
    this.postMessage = jest.fn();
    this.terminate = jest.fn();
    this.onmessage = null;
  }
};

// Mock the metronome initialization
jest.mock('./scripts/metronome', () => ({
  initialize: jest.fn(),
  play: jest.fn(),
  updateParams: jest.fn(),
  stop: jest.fn(),
}));
