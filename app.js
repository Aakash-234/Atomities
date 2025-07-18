class PitchDeck {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 12;
        this.slides = document.querySelectorAll('.slide');
        this.progressFill = document.getElementById('progressFill');
        this.slideCounter = document.getElementById('slideCounter');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateProgress();
        this.updateCounter();
        this.updateButtons();
        this.animateCurrentSlide();
        this.initializeConnectionAnimations();
    }
    
    bindEvents() {
        // Ensure buttons exist before binding events
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.prevSlide();
            });
            
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.nextSlide();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.goToSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        }, { passive: true });
        
        // Click navigation on slide content (optional)
        document.addEventListener('click', (e) => {
            // Only navigate if clicking on slide content and not on interactive elements
            if (e.target.closest('.slide-content') && 
                !e.target.closest('button') && 
                !e.target.closest('a') && 
                !e.target.closest('.navigation')) {
                
                const rect = window.innerWidth;
                if (e.clientX > rect / 2) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    handleSwipe(startX, startY, endX, endY) {
        const threshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            // Remove active class from current slide
            this.slides[this.currentSlide].classList.remove('active');
            
            // Add prev class to current slide if going forward
            if (slideIndex > this.currentSlide) {
                this.slides[this.currentSlide].classList.add('prev');
            } else {
                this.slides[this.currentSlide].classList.remove('prev');
            }
            
            // Update current slide
            this.currentSlide = slideIndex;
            
            // Add active class to new slide
            this.slides[this.currentSlide].classList.add('active');
            
            // Remove prev class from slides that are now active or after
            this.slides.forEach((slide, index) => {
                if (index >= this.currentSlide) {
                    slide.classList.remove('prev');
                }
            });
            
            this.updateProgress();
            this.updateCounter();
            this.updateButtons();
            this.animateCurrentSlide();
        }
    }
    
    updateProgress() {
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }
    }
    
    updateCounter() {
        if (this.slideCounter) {
            this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
        }
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        }
    }
    
    animateCurrentSlide() {
        const currentSlideElement = this.slides[this.currentSlide];
        const slideId = currentSlideElement.id;
        
        // Remove any existing animations
        const elements = currentSlideElement.querySelectorAll('[data-animate]');
        elements.forEach(el => el.classList.remove('animate'));
        
        // Trigger specific animations based on slide
        setTimeout(() => {
            this.triggerSlideAnimations(slideId);
        }, 300);
    }
    
    triggerSlideAnimations(slideId) {
        switch(slideId) {
            case 'slide1':
                this.animateTitleSlide();
                break;
            case 'slide2':
                this.animateProblemSlide();
                break;
            case 'slide3':
                this.animateMarketSlide();
                break;
            case 'slide4':
                this.animateSolutionSlide();
                break;
            case 'slide5':
                this.animateTechnologySlide();
                break;
            case 'slide6':
                this.animateApplicationsSlide();
                break;
            case 'slide7':
                this.animateAdvantageSlide();
                break;
            case 'slide8':
                this.animateBusinessModelSlide();
                break;
            case 'slide9':
                this.animateProjectionsSlide();
                break;
            case 'slide10':
                this.animateRoadmapSlide();
                break;
            case 'slide11':
                this.animateInvestmentSlide();
                break;
            case 'slide12':
                this.animateClosingSlide();
                break;
            default:
                this.animateDefaultSlide();
        }
    }
    
    animateTitleSlide() {
        const connectionNodes = document.querySelectorAll('.connection-node');
        const companyName = document.querySelector('.company-name');
        const tagline = document.querySelector('.tagline');
        const connectionStatement = document.querySelector('.connection-statement');
        
        // Animate connection nodes
        connectionNodes.forEach((node, index) => {
            node.style.transform = 'scale(0)';
            node.style.opacity = '0';
            
            setTimeout(() => {
                node.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                node.style.transform = 'scale(1)';
                node.style.opacity = '1';
            }, index * 200);
        });
        
        // Animate company name
        if (companyName) {
            companyName.style.transform = 'translateY(-30px)';
            companyName.style.opacity = '0';
            
            setTimeout(() => {
                companyName.style.transition = 'all 0.8s ease-out';
                companyName.style.transform = 'translateY(0)';
                companyName.style.opacity = '1';
            }, 400);
        }
        
        // Animate tagline
        if (tagline) {
            tagline.style.transform = 'translateY(20px)';
            tagline.style.opacity = '0';
            
            setTimeout(() => {
                tagline.style.transition = 'all 0.6s ease-out';
                tagline.style.transform = 'translateY(0)';
                tagline.style.opacity = '1';
            }, 600);
        }
        
        // Animate connection statement
        if (connectionStatement) {
            connectionStatement.style.transform = 'scale(0.9)';
            connectionStatement.style.opacity = '0';
            
            setTimeout(() => {
                connectionStatement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                connectionStatement.style.transform = 'scale(1)';
                connectionStatement.style.opacity = '1';
            }, 800);
        }
    }
    
    animateProblemSlide() {
        const statItems = document.querySelectorAll('.stat-item');
        const problemImage = document.querySelector('.problem-image');
        const costImage = document.querySelector('.cost-image');
        
        // Animate problem image
        if (problemImage) {
            problemImage.style.transform = 'scale(0.8)';
            problemImage.style.opacity = '0';
            
            setTimeout(() => {
                problemImage.style.transition = 'all 0.8s ease-out';
                problemImage.style.transform = 'scale(1)';
                problemImage.style.opacity = '1';
            }, 200);
        }
        
        // Animate cost chart
        if (costImage) {
            costImage.style.transform = 'translateX(30px)';
            costImage.style.opacity = '0';
            
            setTimeout(() => {
                costImage.style.transition = 'all 0.6s ease-out';
                costImage.style.transform = 'translateX(0)';
                costImage.style.opacity = '1';
            }, 400);
        }
        
        // Animate stat items
        statItems.forEach((item, index) => {
            item.style.transform = 'translateY(30px)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, 600 + index * 150);
        });
    }
    
    animateMarketSlide() {
        const marketChart = document.querySelector('.market-chart');
        const citations = document.querySelectorAll('.citation');
        const growthItems = document.querySelectorAll('.growth-item');
        
        // Animate market chart
        if (marketChart) {
            marketChart.style.transform = 'scale(0.8)';
            marketChart.style.opacity = '0';
            
            setTimeout(() => {
                marketChart.style.transition = 'all 0.8s ease-out';
                marketChart.style.transform = 'scale(1)';
                marketChart.style.opacity = '1';
            }, 200);
        }
        
        // Animate growth items
        growthItems.forEach((item, index) => {
            const value = item.querySelector('.growth-value');
            if (value) {
                value.style.transform = 'scale(0.5)';
                value.style.opacity = '0';
                
                setTimeout(() => {
                    value.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    value.style.transform = 'scale(1)';
                    value.style.opacity = '1';
                }, 400 + index * 200);
            }
        });
        
        // Animate citations
        citations.forEach((citation, index) => {
            citation.style.transform = 'translateX(20px)';
            citation.style.opacity = '0';
            
            setTimeout(() => {
                citation.style.transition = 'all 0.6s ease-out';
                citation.style.transform = 'translateX(0)';
                citation.style.opacity = '1';
            }, 600 + index * 150);
        });
    }
    
    animateSolutionSlide() {
        const principleCards = document.querySelectorAll('.principle-card');
        
        principleCards.forEach((card, index) => {
            card.style.transform = 'translateY(40px)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 200);
        });
    }
    
    animateTechnologySlide() {
        const performanceChart = document.querySelector('.performance-chart');
        const specItems = document.querySelectorAll('.spec-item');
        const metricItems = document.querySelectorAll('.metric-item');
        
        // Animate performance chart
        if (performanceChart) {
            performanceChart.style.transform = 'scale(0.8)';
            performanceChart.style.opacity = '0';
            
            setTimeout(() => {
                performanceChart.style.transition = 'all 0.8s ease-out';
                performanceChart.style.transform = 'scale(1)';
                performanceChart.style.opacity = '1';
            }, 200);
        }
        
        // Animate spec items
        specItems.forEach((item, index) => {
            item.style.transform = 'translateX(20px)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, 400 + index * 100);
        });
        
        // Animate metric items
        metricItems.forEach((item, index) => {
            item.style.transform = 'scale(0.8)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.transform = 'scale(1)';
                item.style.opacity = '1';
            }, 600 + index * 100);
        });
    }
    
    animateApplicationsSlide() {
        const appCards = document.querySelectorAll('.app-card');
        
        appCards.forEach((card, index) => {
            card.style.transform = 'translateY(30px)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 150);
        });
    }
    
    animateAdvantageSlide() {
        const comparisonRows = document.querySelectorAll('.comparison-row');
        
        comparisonRows.forEach((row, index) => {
            row.style.transform = 'translateX(-20px)';
            row.style.opacity = '0';
            
            setTimeout(() => {
                row.style.transition = 'all 0.6s ease-out';
                row.style.transform = 'translateX(0)';
                row.style.opacity = '1';
            }, index * 150);
        });
    }
    
    animateBusinessModelSlide() {
        const streamCards = document.querySelectorAll('.stream-card');
        const econMetrics = document.querySelectorAll('.econ-metric');
        
        // Animate stream cards
        streamCards.forEach((card, index) => {
            card.style.transform = 'translateY(30px)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 150);
        });
        
        // Animate economics metrics
        econMetrics.forEach((metric, index) => {
            const value = metric.querySelector('.metric-value');
            if (value) {
                value.style.transform = 'scale(0.5)';
                value.style.opacity = '0';
                
                setTimeout(() => {
                    value.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    value.style.transform = 'scale(1)';
                    value.style.opacity = '1';
                }, 600 + index * 200);
            }
        });
    }
    
    animateProjectionsSlide() {
        const projectionCards = document.querySelectorAll('.projection-card');
        const driverItems = document.querySelectorAll('.driver-item');
        
        // Animate projection cards
        projectionCards.forEach((card, index) => {
            card.style.transform = 'translateY(30px)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 200);
        });
        
        // Animate driver items
        driverItems.forEach((item, index) => {
            item.style.transform = 'translateX(20px)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, 400 + index * 150);
        });
    }
    
    animateRoadmapSlide() {
        const milestones = document.querySelectorAll('.milestone');
        const expertiseCards = document.querySelectorAll('.expertise-card');
        
        // Animate milestones
        milestones.forEach((milestone, index) => {
            const marker = milestone.querySelector('.milestone-marker');
            const content = milestone.querySelector('.milestone-content');
            
            if (marker) {
                marker.style.transform = 'scale(0)';
                marker.style.opacity = '0';
                
                setTimeout(() => {
                    marker.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    marker.style.transform = 'scale(1)';
                    marker.style.opacity = '1';
                }, index * 200);
            }
            
            if (content) {
                content.style.transform = 'translateY(20px)';
                content.style.opacity = '0';
                
                setTimeout(() => {
                    content.style.transition = 'all 0.6s ease-out';
                    content.style.transform = 'translateY(0)';
                    content.style.opacity = '1';
                }, index * 200 + 100);
            }
        });
        
        // Animate expertise cards
        expertiseCards.forEach((card, index) => {
            card.style.transform = 'translateY(20px)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, 800 + index * 150);
        });
    }
    
    animateInvestmentSlide() {
        const fundingAsk = document.querySelector('.funding-ask');
        const fundBars = document.querySelectorAll('.fund-fill');
        const highlightCards = document.querySelectorAll('.highlight-card');
        
        // Animate funding ask
        if (fundingAsk) {
            fundingAsk.style.transform = 'scale(0.9)';
            fundingAsk.style.opacity = '0';
            
            setTimeout(() => {
                fundingAsk.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                fundingAsk.style.transform = 'scale(1)';
                fundingAsk.style.opacity = '1';
            }, 200);
        }
        
        // Animate funding bars
        fundBars.forEach((bar, index) => {
            const originalWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-out';
                bar.style.width = originalWidth;
            }, 600 + index * 200);
        });
        
        // Animate highlight cards
        highlightCards.forEach((card, index) => {
            card.style.transform = 'translateY(20px)';
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, 400 + index * 150);
        });
    }
    
    animateClosingSlide() {
        const networkNodes = document.querySelectorAll('.network-node');
        const ctaButton = document.querySelector('.cta-button');
        
        // Animate network nodes
        networkNodes.forEach((node, index) => {
            node.style.transform = 'scale(0)';
            node.style.opacity = '0';
            
            setTimeout(() => {
                node.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                node.style.transform = 'scale(1)';
                node.style.opacity = '1';
            }, index * 200);
        });
        
        // Animate network connections
        setTimeout(() => {
            const activeNode = document.querySelector('.network-node.active');
            if (activeNode) {
                activeNode.style.background = 'var(--color-primary)';
                activeNode.style.boxShadow = '0 0 0 4px var(--color-primary-light)';
            }
        }, 800);
        
        // Animate CTA button
        if (ctaButton) {
            ctaButton.style.transform = 'scale(0.8)';
            ctaButton.style.opacity = '0';
            
            setTimeout(() => {
                ctaButton.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                ctaButton.style.transform = 'scale(1)';
                ctaButton.style.opacity = '1';
            }, 1000);
        }
    }
    
    animateDefaultSlide() {
        const elements = document.querySelectorAll(`#slide${this.currentSlide + 1} .slide-content > *`);
        
        elements.forEach((element, index) => {
            element.style.transform = 'translateY(20px)';
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, index * 100);
        });
    }
    
    initializeConnectionAnimations() {
        // Initialize connection flow animations
        const connectionLines = document.querySelectorAll('.connection-line');
        connectionLines.forEach(line => {
            line.style.animation = 'flow 3s infinite';
        });
        
        // Initialize connection nodes pulse
        const connectionNodes = document.querySelectorAll('.connection-node');
        connectionNodes.forEach(node => {
            node.style.animation = 'pulse 2s infinite';
        });
    }
    
    // Method to handle CTA button click
    handleCTAClick() {
        const ctaButton = document.querySelector('.cta-button');
        
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                ctaButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    ctaButton.style.transform = 'scale(1)';
                }, 150);
                
                // Show demo scheduling message
                this.showDemoMessage();
            });
        }
    }
    
    showDemoMessage() {
        // Create a temporary message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-6);
            box-shadow: var(--shadow-xl);
            z-index: 2000;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        message.innerHTML = `
            <h3 style="margin-bottom: var(--space-3); color: var(--color-text);">Demo Request Received</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-4);">Thank you for your interest in Atomites. We'll contact you shortly to schedule a demo.</p>
            <button onclick="this.parentElement.remove()" style="
                background: var(--color-primary);
                color: var(--color-background);
                border: none;
                padding: var(--space-2) var(--space-4);
                border-radius: var(--radius-md);
                cursor: pointer;
                font-size: var(--font-size-sm);
                font-weight: var(--font-weight-medium);
            ">Close</button>
        `;
        
        document.body.appendChild(message);
        
        // Fade in
        setTimeout(() => {
            message.style.opacity = '1';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.style.opacity = '0';
                setTimeout(() => {
                    if (message.parentElement) {
                        message.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Method to add hover effects to interactive elements
    addHoverEffects() {
        const hoverElements = document.querySelectorAll('.principle-card, .app-card, .stream-card, .expertise-card, .highlight-card, .stat-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-4px)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Method to handle window resize
    handleResize() {
        this.updateProgress();
        
        // Adjust layout for mobile
        if (window.innerWidth <= 768) {
            this.adjustMobileLayout();
        }
    }
    
    adjustMobileLayout() {
        // Mobile-specific adjustments
        const slideContent = document.querySelectorAll('.slide-content');
        slideContent.forEach(content => {
            content.style.padding = 'var(--space-6)';
        });
    }
    
    // Method to preload images
    preloadImages() {
        const images = [
            'https://pplx-res.cloudinary.com/image/upload/v1752847261/pplx_project_search_images/ab4c368d3f64f6b6a99e1c890f98fd4a6feb0ffc.jpg',
            'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/4fd9c7139777d5da1b57af302b36ade0/5d2d15b9-41bc-4b49-a759-73076de4e061/2bfbcf7a.png',
            'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/4fd9c7139777d5da1b57af302b36ade0/5d4eb90e-990b-4d4f-97d2-2e84dd137255/7b1e2dae.png',
            'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/4fd9c7139777d5da1b57af302b36ade0/8187e32f-0775-44a7-bd0f-976eaaf33831/cccabad5.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Method to add accessibility features
    addAccessibilityFeatures() {
        // Add ARIA labels
        document.querySelectorAll('.slide').forEach((slide, index) => {
            slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.totalSlides}`);
        });
        
        // Add keyboard navigation hints
        document.addEventListener('keydown', (e) => {
            if (e.key === 'h' || e.key === 'H') {
                this.showKeyboardHelp();
            }
        });
    }
    
    showKeyboardHelp() {
        const helpText = `
            Keyboard Navigation:
            • Arrow Keys: Navigate slides
            • Home: Go to first slide
            • End: Go to last slide
            • H: Show this help
            • F: Toggle fullscreen
        `;
        
        console.log(helpText);
        
        // Could show visual help overlay here
        alert(helpText);
    }
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (range * easeOutQuart);
        
        element.textContent = formatNumber(Math.floor(current));
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = formatNumber(end);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Initialize the pitch deck when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure all elements are rendered
    setTimeout(() => {
        const pitchDeck = new PitchDeck();
        
        // Add interactive features
        pitchDeck.addHoverEffects();
        pitchDeck.handleCTAClick();
        pitchDeck.addAccessibilityFeatures();
        
        // Preload images for smoother experience
        pitchDeck.preloadImages();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            pitchDeck.handleResize();
        });
        
        // Add smooth scrolling for any internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add presentation mode toggle (optional)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'f' || e.key === 'F') {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.documentElement.requestFullscreen();
                }
            }
        });
        
        // Performance optimization: Intersection Observer for lazy loading
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
        
        // Store reference globally for debugging
        window.pitchDeck = pitchDeck;
    }, 100);
});

// Export for potential external use
window.PitchDeck = PitchDeck;