document.addEventListener('DOMContentLoaded', () => {

    const GlitchLogic = {
        props: ['content', 'scrambleType', 'intervalTime', 'componentType'], 
        data() {
            return {
                displayText: '',
                isGlitching: false,
                glitchIntensity: 1,
            }  
        },
        mounted() {
            console.log('🔧 GlitchLogic mounted for:', this.content);
            
            // Set glitch intensity based on component type and phase
            if (this.componentType === 'title' || this.componentType === 'intro-title') {
                this.glitchIntensity = 3; // More chaotic for intro titles
            } else if (this.componentType === 'hero-title') {
                this.glitchIntensity = 2; // Medium for main titles
            } else {
                this.glitchIntensity = 1; // Subtle for everything else
            }
            
            this.displayText = this.content;
            this.startGlitch();
        },
        
        methods: {
            getRandomChar() {
                const charCode = 33 + Math.floor(Math.random() * 94);
                return String.fromCharCode(charCode);
            },

            // Chaotic progressive for intro
            doChaoticProgressive() {
                let currentText = '';
                const length = this.content.length;
                let revealIndex = 0;

                const revealInterval = setInterval(() => {
                    if (revealIndex < length) {
                        // Add the correct character
                        currentText += this.content[revealIndex];
                        
                        // Add some random glitch characters after
                        if (Math.random() < 0.3 && this.glitchIntensity > 1) {
                            currentText += this.getRandomChar();
                        }
                        
                        revealIndex++;
                        this.displayText = currentText;
                    } else {
                        clearInterval(revealInterval);
                        // Final cleanup - remove any extra glitch characters
                        setTimeout(() => {
                            this.displayText = this.content;
                        }, 500);
                    }
                }, 80);
            },

            // Clean progressive for main content
            doCleanProgressive() {
                let currentText = '';
                const length = this.content.length;
                let revealIndex = 0;

                const revealInterval = setInterval(() => {
                    if (revealIndex < length) {
                        currentText += this.content[revealIndex];
                        revealIndex++;
                        this.displayText = currentText;
                    } else {
                        clearInterval(revealInterval);
                        this.displayText = this.content;
                    }
                }, 60);
            },

            // Chaotic random - more intense glitches
            doChaoticRandom() {
                this.displayText = this.content;
                
                setInterval(() => {
                    if (Math.random() < 0.15) { // 15% chance to glitch
                        this.doIntenseGlitch();
                    }
                }, this.intervalTime || 1500);
            },

            // Clean random - subtle glitches
            doCleanRandom() {
                this.displayText = this.content;
                
                setInterval(() => {
                    if (Math.random() < 0.1) { // 10% chance to glitch
                        this.doQuickGlitch();
                    }
                }, this.intervalTime || 2000);
            },

            // Intense glitch for chaotic effects
            doIntenseGlitch() {
                if (this.isGlitching) return;
                
                this.isGlitching = true;
                const originalText = this.displayText;
                const textArray = originalText.split('');
                
                // Glitch more characters based on intensity
                const glitchCount = Math.floor(Math.random() * this.glitchIntensity * 2) + 1;
                
                for (let i = 0; i < glitchCount; i++) {
                    const randomIndex = Math.floor(Math.random() * textArray.length);
                    textArray[randomIndex] = this.getRandomChar();
                }
                
                this.displayText = textArray.join('');
                
                // Multiple glitch phases for chaotic effect
                let phase = 1;
                const maxPhases = this.glitchIntensity;
                
                const glitchPhase = setInterval(() => {
                    if (phase >= maxPhases) {
                        clearInterval(glitchPhase);
                        this.displayText = originalText;
                        this.isGlitching = false;
                        return;
                    }
                    
                    const newTextArray = originalText.split('');
                    const newGlitchCount = Math.floor(Math.random() * 3) + 1;
                    
                    for (let i = 0; i < newGlitchCount; i++) {
                        const randomIndex = Math.floor(Math.random() * newTextArray.length);
                        newTextArray[randomIndex] = this.getRandomChar();
                    }
                    
                    this.displayText = newTextArray.join('');
                    phase++;
                }, 80);
            },

            // Quick glitch - subtle version
            doQuickGlitch() {
                if (this.isGlitching) return;
                
                this.isGlitching = true;
                const originalText = this.displayText;
                const textArray = originalText.split('');
                
                // Glitch 1-2 random characters
                const glitchCount = Math.floor(Math.random() * 2) + 1;
                
                for (let i = 0; i < glitchCount; i++) {
                    const randomIndex = Math.floor(Math.random() * textArray.length);
                    textArray[randomIndex] = this.getRandomChar();
                }
                
                this.displayText = textArray.join('');
                
                // Revert back quickly
                setTimeout(() => {
                    this.displayText = originalText;
                    this.isGlitching = false;
                }, 100);
            },

            // Interval glitch - chaotic version
            doChaoticInterval() {
                this.displayText = this.content;
                
                setInterval(() => {
                    if (!this.isGlitching) {
                        this.doIntenseGlitch();
                    }
                }, this.intervalTime || 2000);
            },

            // Interval glitch - clean version
            doCleanInterval() {
                this.displayText = this.content;
                
                setInterval(() => {
                    if (!this.isGlitching) {
                        this.doQuickGlitch();
                    }
                }, this.intervalTime || 3000);
            },

            // Continuous glitch - chaotic version
            doChaoticContinuous() {
                this.displayText = this.content;
                
                setInterval(() => {
                    if (!this.isGlitching && Math.random() < 0.4) {
                        this.doIntenseGlitch();
                    }
                }, 400);
            },

            // Continuous glitch - subtle version
            doCleanContinuous() {
                this.displayText = this.content;
                
                setInterval(() => {
                    if (!this.isGlitching && Math.random() < 0.3) {
                        this.doQuickGlitch();
                    }
                }, 500);
            },

            startGlitch() {
                const isIntro = this.componentType === 'title' || this.componentType === 'intro-title';
                
                switch(this.scrambleType) {
                    case 'progressive':
                        if (isIntro) {
                            this.doChaoticProgressive();
                        } else {
                            this.doCleanProgressive();
                        }
                        break;
                    case 'random':
                        if (isIntro) {
                            this.doChaoticRandom();
                        } else {
                            this.doCleanRandom();
                        }
                        break;
                    case 'interval':
                        if (isIntro) {
                            this.doChaoticInterval();
                        } else {
                            this.doCleanInterval();
                        }
                        break;
                    case 'continuous':
                        if (isIntro) {
                            this.doChaoticContinuous();
                        } else {
                            this.doCleanContinuous();
                        }
                        break;
                    default:
                        this.displayText = this.content;
                }
            }
        }
    };

    const GlitchDisplay = {
        mixins: [GlitchLogic],
        props: ['content', 'componentType', 'scrambleType', 'intervalTime'],
        mounted() {
            console.log('🔧 GlitchDisplay mounted:', {
                content: this.content,
                componentType: this.componentType,
                scrambleType: this.scrambleType
            });
        },
        template: `
            <div 
                :class="['glitch-container', componentType === 'title' ? 'intro-title' : '', componentType]"
                :role="componentType === 'title' ? 'heading' : 'div'" 
                :aria-label="content"
            >
                <span 
                    class="scrambled" 
                    :class="{ 
                        'flicker': componentType === 'content',
                        'continuous-scramble': scrambleType === 'continuous'
                    }"
                >
                    {{ displayText }}
                </span>
            </div>
        `,
    };

    const GlitchButtonDisplay = {
        mixins: [GlitchLogic],
        props: ['content', 'scrambleType', 'pulseEffect'],
        emits: ['click'],
        methods: {
            handleClick() {
                if (this.$parent && this.$parent.playGlitchSound) {
                    this.$parent.playGlitchSound('button');
                }
                this.$emit('click');
            }
        },
        template: `
            <div 
                class="glitch-button" 
                :class="{ 'pulse-effect': pulseEffect }"
                role="button" 
                :aria-label="content"
                @click="handleClick"
            >
                <span class="scrambled">{{ displayText }}</span>
            </div>
        `,
    };

    const GlitchTextParagraph = {
        props: ['text', 'scrambleInterval'],
        data() {
            return {
                words: [],
                glitchingWords: new Set()
            }
        },
        methods: {
            initializeWords() {
                const cleanText = this.text.replace(/\s+/g, ' ').trim();
                this.words = cleanText.split(' ').map(word => ({
                    text: word,
                    isGlitching: false,
                    displayText: word
                }));
            },
            
            startRandomGlitch() {
                if (this.words.length === 0) return;
                
                const randomIndex = Math.floor(Math.random() * this.words.length);
                const word = this.words[randomIndex];
                
                if (!word.isGlitching) {
                    word.isGlitching = true;
                    this.glitchWord(word);
                    
                    setTimeout(() => {
                        word.isGlitching = false;
                        word.displayText = word.text;
                    }, 300);
                }
            },
            
            glitchWord(word) {
                const originalText = word.text;
                let glitchCount = 0;
                const maxGlitches = Math.min(2, originalText.length); // Reduced from 3 to 2
                
                const glitchInterval = setInterval(() => {
                    if (glitchCount >= maxGlitches || !word.isGlitching) {
                        clearInterval(glitchInterval);
                        word.displayText = originalText;
                        return;
                    }
                    
                    const chars = originalText.split('');
                    const glitchIndex = Math.floor(Math.random() * chars.length);
                    chars[glitchIndex] = this.getRandomChar();
                    word.displayText = chars.join('');
                    
                    glitchCount++;
                }, 80); // Faster glitch
            },
            
            getRandomChar() {
                const charCode = 33 + Math.floor(Math.random() * 94);
                return String.fromCharCode(charCode);
            }
        },
        mounted() {
            this.initializeWords();
            this.glitchInterval = setInterval(() => {
                this.startRandomGlitch();
            }, this.scrambleInterval || 300); // Slightly longer interval
        },
        beforeUnmount() {
            if (this.glitchInterval) {
                clearInterval(this.glitchInterval);
            }
        },
        template: `
            <div class="glitch-paragraph">
                <span v-for="(word, index) in words" :key="index" class="glitch-word">
                    {{ word.displayText }}
                </span>
            </div>
        `
    };

    Vue.createApp({
        components: { 
            'glitch-display': GlitchDisplay,
            'glitch-button-display': GlitchButtonDisplay,
            'glitch-text-paragraph': GlitchTextParagraph
        },
        data() {
            return {
                phase: 'start', 
                isVideoActive: false,
                showButton: false,
                isTransitionActive: false,
                glitchSound1Played: false,
                glitchSound2Played: false,
                isTabChanging: false,
                
                introTitle: "SEV7NSECONDS' LEGACY?",
                introButtonText: "initiate //",

                tabs: ['Home', 'Portfolios', 'Contact'],
                activeTab: 'Home',
                contentMap: {
                    'Home': 'DESIGNER / CREATIVE',
                    'Portfolios': 'SELECTED WORKS',
                    'Contact': 'SEV7NSECONDS on INSTAGRAM'
                },
                
                videoMap: {
                    'Home': 'apps/assets/bgvideo/arcane x hvn on earth.mp4',
                    'Portfolios': 'apps/assets/bgvideo/jocelyn birthday edit revision.mp4',
                    'Contact': 'apps/assets/bgvideo/pocket rocket x imday edit phase 1.mp4'
                },
                isChangingVideo: false,

                heroLocation: 'Tangerang',
                heroTitle1: 'SEV7NSECONDS',
                heroTitle2: 'LEGACY',
                profileText: `I'm a unique designer who sees things a little differently. Somewhere along the way I fell in love with motion design, the way ideas move, twist, and come alive on screen. signs that push boundaries. Every animation I make feels like it has its own personality, and I can't help but get lost in it. Designing isn't just about making things look good anymore; it's about bringing them to life, and I'm completely hooked.`,
                copyrightText: '© 2025 copyright SEV7NSECONDS, all rights not reserved.',
                skills: [
                    {
                        title: 'Motion Design',
                        items: ['After Effects', 'Premiere Pro', 'Cinema 4D', 'Blender']
                    },
                    {
                        title: 'Visual Design',
                        items: ['Photoshop', 'Illustrator', 'Figma', 'InDesign']
                    },
                ],
                
                portfolioCategories: ['Posters', 'Videos'],
                portfolioCategory: 'Posters',
                portfolioItems: [
                    {
                        id: 1,
                        title: 'NEON DREAMS',
                        category: 'Posters',
                        thumbnail: 'poster1.jpg',
                        description: 'Cyberpunk inspired motion poster',
                        isGlitching: false
                    },
                    {
                        id: 2,
                        title: 'SYSTEM FAILURE',
                        category: 'Posters', 
                        thumbnail: 'poster2.jpg',
                        description: 'Glitch art series',
                        isGlitching: false
                    },
                    {
                        id: 3,
                        title: 'ARCANE EDIT',
                        category: 'Videos',
                        video: 'video1.mp4',
                        description: 'Character motion showcase',
                        isGlitching: false
                    },
                    {
                        id: 4,
                        title: 'HAVOC',
                        category: 'Videos',
                        video: 'video2.mp4', 
                        description: 'Experimental visual piece',
                        isGlitching: false
                    }
                ],
                
                contactMethods: [
                    { platform: 'INSTAGRAM', handle: '@sev7nseconds' },
                    { platform: 'EMAIL', handle: 'contact@sev7n.com' },
                    { platform: 'BEHANCE', handle: 'behance.net/sev7n' }
                ]
            }
        },
        computed: {
            currentContent() {
                return this.contentMap[this.activeTab] || '';
            },
            shouldShowProfile() {
                return this.activeTab === 'Home';
            },
            currentVideo() {
                return this.videoMap[this.activeTab] || this.videoMap['Home'];
            },
            currentPortfolioItems() {
                return this.portfolioItems.filter(item => item.category === this.portfolioCategory);
            },
        },
        methods: {
            startSequence() {
                console.log('=== START SEQUENCE CALLED ===');
                this.phase = 'video';
                this.isVideoActive = true; 

                setTimeout(() => {
                    const videoEl = this.$refs.introVideo;

                    if (videoEl) {
                        videoEl.play().catch(error => {
                            console.log('Video autoplay prevented, skipping to main');
                            this.videoEnded(); 
                        });
                    } else {
                        this.videoEnded(); 
                    }
                }, 1000);
            },

            videoTimeUpdate(event) {
                const video = event.target;
                if (!this.glitchSound1Played && video.duration - video.currentTime <= 1) {
                    this.playGlitchSound('glitch1');
                    this.glitchSound1Played = true;
                }
                if (!this.glitchSound2Played && video.duration - video.currentTime <= 0.3) {
                    this.playGlitchSound('glitch2');
                    this.glitchSound2Played = true;
                }
            },

            playGlitchSound(soundType) {
                let soundRef;
                let volume = 1.0;
                
                switch(soundType) {
                    case 'glitch1':
                        soundRef = this.$refs.glitchSound1;
                        volume = 0.8;
                        break;
                    case 'glitch2':
                        soundRef = this.$refs.glitchSound2;
                        volume = 0.9;
                        break;
                    case 'tab':
                        soundRef = this.$refs.tabChangeSound;
                        volume = 0.6;
                        break;
                    case 'button':
                        soundRef = this.$refs.buttonClickSound;
                        volume = 0.7;
                        break;
                    default:
                        soundRef = this.$refs.glitchSound1;
                }

                if (soundRef) {
                    soundRef.volume = volume;
                    soundRef.currentTime = 0;
                    soundRef.play().catch(e => console.log(`${soundType} sound play prevented:`, e));
                }
            },
            
            videoEnded() {
                this.isVideoActive = false;
                this.startGlitchTransition();
            },

            startGlitchTransition() {
                this.phase = 'transition';
                this.isTransitionActive = true;
                this.playGlitchSound('glitch2');

                setTimeout(() => {
                    this.phase = 'main';
                    this.isTransitionActive = false;
                    
                    this.$nextTick(() => {
                        const bgVideo = this.$refs.backgroundVideo;
                        const bgSound = this.$refs.backgroundSound;
                        
                        if (bgVideo) {
                            bgVideo.play().catch(error => {
                                console.log('Background video autoplay prevented');
                            });
                        }
                        
                        if (bgSound) {
                            bgSound.volume = 0.3;
                            bgSound.play().catch(error => {
                                console.log('Background sound autoplay prevented');
                            });
                        }
                    });
                }, 2500);
            },
            
            changeTab(newTab) {
                if (this.activeTab === newTab || this.isTabChanging) return;
                
                this.isTabChanging = true;
                this.isChangingVideo = true;
                this.playGlitchSound('tab');
                this.triggerTabChangeEffects();
                
                setTimeout(() => {
                    this.activeTab = newTab;
                    
                    this.$nextTick(() => {
                        const bgVideo = this.$refs.backgroundVideo;
                        if (bgVideo) {
                            bgVideo.load();
                            bgVideo.play().catch(error => {
                                console.log('Video playback prevented');
                            });
                        }
                        
                        setTimeout(() => {
                            this.isChangingVideo = false;
                            this.isTabChanging = false;
                        }, 100);
                    });
                }, 500);
            },
            
            triggerTabChangeEffects() {
                const activeTabElement = document.querySelector('.tab.active');
                if (activeTabElement) {
                    activeTabElement.classList.add('glitching');
                    setTimeout(() => {
                        activeTabElement.classList.remove('glitching');
                    }, 300);
                }
                
                this.showTabGlitchOverlay();
            },
            
            showTabGlitchOverlay() {
                const glitchOverlay = document.createElement('div');
                glitchOverlay.className = 'tab-change-glitch active';
                document.getElementById('app').appendChild(glitchOverlay);
                
                setTimeout(() => {
                    if (glitchOverlay.parentNode) {
                        glitchOverlay.parentNode.removeChild(glitchOverlay);
                    }
                }, 800);
            },

            setPortfolioCategory(category) {
                if (this.portfolioCategory === category) return;
                this.portfolioCategory = category;
                this.playGlitchSound('tab');
                this.triggerTabChangeEffects();
            },

            startPortfolioGlitch(item) {
                item.isGlitching = true;
            },
            
            stopPortfolioGlitch(item) {
                item.isGlitching = false;
            }
        },

        mounted() {
            setTimeout(() => {
                this.showButton = true;
            }, 1500);
        },

    }).mount('#app')

});