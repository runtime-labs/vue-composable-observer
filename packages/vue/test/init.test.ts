import { describe, expect, it } from "vitest";
import { ComposableObserverVuePlugin } from "../src";
import { createApp } from "vue";

describe('init', () => {
    it('should initialize the plugin', () => {
        const app = createApp({})

        app.use(ComposableObserverVuePlugin)

        expect(() => { app.use(ComposableObserverVuePlugin) }).not.toThrow()
    })
})