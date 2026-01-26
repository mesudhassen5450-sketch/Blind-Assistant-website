export type Language = 'en' | 'am' | 'om';

export const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            apps: "Top Apps",
            links: "Useful Links",
            accessibility: "Accessibility",
            contact: "Contact",
        },
        controls: {
            textSize: "Text Size",
            theme: "Theme",
            language: "Language",
            dark: "Current",
            light: "White",
            contrast: "Contrasted",
            increase: "Increase text size",
            decrease: "Decrease text size",
        },
        hero: {
            title: "Empowering the Blind & Visually Impaired",
            subtitle: "Discover tools, apps, and guides designed specifically to help you navigate the digital world with confidence.",
            cta: "Explore Apps",
        }
    },
    am: {
        nav: {
            home: "ቤት",
            about: "ስለ እኛ",
            apps: "ምርጥ መተግበሪያዎች",
            links: "ጠቃሚ አገናኞች",
            accessibility: "ተደራሽነት",
            contact: "እውቂያ",
        },
        controls: {
            textSize: "የጽሑፍ መጠን",
            theme: "ገጽታ",
            language: "ቋንቋ",
            dark: "የአሁኑ",
            light: "ነጭ",
            contrast: "ጎልቶ የሚታይ",
            increase: "የጽሑፍ መጠን ይጨምሩ",
            decrease: "የጽሑፍ መጠን ይቀንሱ",
        },
        hero: {
            title: "ለዓይነ ስውራን እና ማየት ለተሳናቸው አቅም መፍጠር",
            subtitle: "የዲጂታሉን ዓለም በልበ ሙሉነት እንዲጎበኙ ተብለው የተነደፉ መሣሪያዎችን፣ መተግበሪያዎችን እና መመሪያዎችን ያግኙ።",
            cta: "መተግበሪያዎችን ያስሱ",
        }
    },
    om: {
        nav: {
            home: "Mana",
            about: "Waa'ee",
            apps: "Appiiwwan Ciccoo",
            links: "Geessitoota Fayyadoo",
            accessibility: "Aksesibiilitii",
            contact: "Nu Quunnamaa",
        },
        controls: {
            textSize: "Guddina Barruu",
            theme: "Bifa",
            language: "Afaan",
            dark: "Ammaa",
            light: "Adii",
            contrast: "Garaagarummaa Olaanaa",
            increase: "Guddina barruu dabali",
            decrease: "Guddina barruu hir'isi",
        },
        hero: {
            title: "Warra Qaroo dhabeeyyii fi Hir'uu Qaroo Humneessuu",
            subtitle: "Meeshaalee, appiiwwan fi qajeelfamoota addatti addunyaa dijitaalaa keessa lixuuf isin gargaaruuf qophaa'an bari.",
            cta: "Appiiwwan Sakatta'i",
        }
    }
};

export type TranslationKeys = typeof translations.en;
