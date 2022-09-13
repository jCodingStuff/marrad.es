import { Component } from "@angular/core";
import { LanguageService } from "../language.service";

/**
 * Abstract component representing a language-dependent section
 */
@Component({
    selector: 'app-language',
    template: ''
})
export abstract class LanguageComponent {

    /**
     * Creates a new LanguageComponent instance
     * @param langService - the language service that will be injected
     */
    constructor(private langService: LanguageService) {}

    /**
     * Set a new app-wide language
     * @param language - the new language
     */
    public setLanguage(language: string): void {
        this.langService.language = language;
    }

    /**
     * Get the current app-wide language
     * @returns string representing the language
     */
    public getLanguage(): string {
        return this.langService.language;
    }

    /**
     * Get the supported languages
     * @returns array of strings representing the languages
     */
    public getSupportedLanguages(): string[] {
        return this.langService.supportedLangs;
    }

}