// =============================================
// Friends of Finance — Community Activity CRM
// Complete Application Logic
// =============================================

(function () {
    'use strict';

    // =============================================
    // CONSTANTS
    // =============================================
    const COMMUNITY_SPACES = [
        'Personal Finance Forum', 'Investment Circle', 'Tax Planning Hub',
        'Budgeting Bootcamp', 'Retirement Planning Group', 'FinTech Innovation Lab',
        'Wealth Building Mentorship', 'Community Events', 'Welcome & Onboarding',
        'Financial Literacy Library'
    ];

    const ACTIVITY_TYPES = [
        'Forum Post', 'Forum Comment', 'Webinar Attended', 'Workshop Participation',
        'Study Group Session', 'Mentorship Meeting', 'Event Attendance',
        'Resource Shared', 'Question Asked', 'Peer Introduction',
        'Challenge Completed', 'Content Contribution'
    ];

    const OWNERS = ['Alex Kim', 'Jordan Lee', 'Priya Nair', 'Unassigned'];

    const AVATAR_COLORS = [
        '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
        '#ef4444', '#ec4899', '#14b8a6', '#3b82f6', '#f97316',
        '#84cc16', '#a855f7', '#0ea5e9', '#22c55e', '#e11d48',
        '#7c3aed', '#0891b2', '#059669'
    ];

    // =============================================
    // SAMPLE DATA — 18 fictional members
    // =============================================
    const today = new Date();
    const daysAgo = (d) => {
        const dt = new Date(today);
        dt.setDate(dt.getDate() - d);
        return dt.toISOString().split('T')[0];
    };

    const DEFAULT_MEMBERS = [
        {
            id: 1, name: 'Sarah Chen', email: 'sarah.chen@email.com', phone: '+1-555-0101',
            joinDate: daysAgo(5), owner: 'Alex Kim', nextAction: 'Welcome call scheduled',
            interests: ['Personal Finance', 'Budgeting', 'Saving Strategies'],
            notes: 'Referred by community event. Eager to learn about budgeting.',
            activities: [
                { date: daysAgo(4), type: 'Event Attendance', space: 'Welcome & Onboarding', details: 'Attended new member orientation session' },
                { date: daysAgo(2), type: 'Forum Post', space: 'Personal Finance Forum', details: 'Introduced themselves and shared budgeting goals' }
            ]
        },
        {
            id: 2, name: 'Marcus Johnson', email: 'marcus.j@email.com', phone: '+1-555-0102',
            joinDate: daysAgo(3), owner: 'Jordan Lee', nextAction: 'Send welcome resources',
            interests: ['Investing', 'Crypto', 'FinTech'],
            notes: 'Joined after seeing social media post.',
            activities: [
                { date: daysAgo(2), type: 'Event Attendance', space: 'Welcome & Onboarding', details: 'Completed onboarding checklist' }
            ]
        },
        {
            id: 3, name: 'Aisha Patel', email: 'aisha.patel@email.com', phone: '+1-555-0103',
            joinDate: daysAgo(90), owner: 'Alex Kim', nextAction: 'Invite to mentor programme',
            interests: ['Investment', 'Retirement Planning', 'Tax Strategy'],
            notes: 'Very knowledgeable. Potential mentor candidate.',
            activities: [
                { date: daysAgo(1), type: 'Mentorship Meeting', space: 'Wealth Building Mentorship', details: 'Led Q&A session on retirement accounts' },
                { date: daysAgo(3), type: 'Forum Post', space: 'Investment Circle', details: 'Shared analysis of index fund performance' },
                { date: daysAgo(5), type: 'Webinar Attended', space: 'Retirement Planning Group', details: 'Attended "Maximising Your 401(k)" webinar' },
                { date: daysAgo(7), type: 'Content Contribution', space: 'Financial Literacy Library', details: 'Published guide on tax-advantaged accounts' },
                { date: daysAgo(9), type: 'Forum Comment', space: 'Personal Finance Forum', details: 'Answered 5 member questions about Roth IRA conversions' },
                { date: daysAgo(11), type: 'Study Group Session', space: 'Investment Circle', details: 'Facilitated discussion on portfolio diversification' },
                { date: daysAgo(14), type: 'Peer Introduction', space: 'Community Events', details: 'Connected two members with shared interest in ESG investing' },
                { date: daysAgo(17), type: 'Resource Shared', space: 'Financial Literacy Library', details: 'Uploaded retirement planning spreadsheet template' },
                { date: daysAgo(20), type: 'Workshop Participation', space: 'Tax Planning Hub', details: 'Attended tax optimisation workshop' },
                { date: daysAgo(25), type: 'Forum Post', space: 'Retirement Planning Group', details: 'Started discussion on early retirement strategies' }
            ]
        },
        {
            id: 4, name: 'David Okonkwo', email: 'david.o@email.com', phone: '+1-555-0104',
            joinDate: daysAgo(120), owner: 'Priya Nair', nextAction: 'Feature in community spotlight',
            interests: ['Wealth Building', 'Entrepreneurship', 'Real Estate'],
            notes: 'Active contributor and natural community leader.',
            activities: [
                { date: daysAgo(1), type: 'Forum Post', space: 'Personal Finance Forum', details: 'Shared monthly financial check-in template' },
                { date: daysAgo(2), type: 'Mentorship Meeting', space: 'Wealth Building Mentorship', details: 'Mentored new member on building emergency fund' },
                { date: daysAgo(4), type: 'Content Contribution', space: 'Financial Literacy Library', details: 'Created video tutorial on real estate investing basics' },
                { date: daysAgo(6), type: 'Event Attendance', space: 'Community Events', details: 'Hosted community AMA on side hustles' },
                { date: daysAgo(8), type: 'Forum Comment', space: 'Investment Circle', details: 'Provided feedback on member investment proposals' },
                { date: daysAgo(10), type: 'Workshop Participation', space: 'Budgeting Bootcamp', details: 'Guest speaker on entrepreneurial budgeting' },
                { date: daysAgo(13), type: 'Peer Introduction', space: 'Community Events', details: 'Introduced 3 members for real estate study group' },
                { date: daysAgo(16), type: 'Challenge Completed', space: 'Budgeting Bootcamp', details: 'Completed and reviewed 30-day savings challenge' },
                { date: daysAgo(19), type: 'Resource Shared', space: 'Financial Literacy Library', details: 'Shared curated reading list on wealth psychology' },
                { date: daysAgo(22), type: 'Study Group Session', space: 'Investment Circle', details: 'Led session on alternative investments' },
                { date: daysAgo(28), type: 'Forum Post', space: 'Personal Finance Forum', details: 'Published monthly community digest' }
            ]
        },
        {
            id: 5, name: 'Emily Nakamura', email: 'emily.n@email.com', phone: '+1-555-0105',
            joinDate: daysAgo(60), owner: 'Alex Kim', nextAction: 'Check in on study group progress',
            interests: ['Budgeting', 'Student Loans', 'Credit Building'],
            notes: 'Recent graduate working on debt repayment plan.',
            activities: [
                { date: daysAgo(2), type: 'Study Group Session', space: 'Budgeting Bootcamp', details: 'Participated in debt reduction strategy session' },
                { date: daysAgo(8), type: 'Question Asked', space: 'Personal Finance Forum', details: 'Asked about student loan refinancing options' },
                { date: daysAgo(12), type: 'Webinar Attended', space: 'Community Events', details: 'Attended credit score improvement webinar' },
                { date: daysAgo(18), type: 'Forum Comment', space: 'Budgeting Bootcamp', details: 'Shared progress on monthly budget tracking' },
                { date: daysAgo(26), type: 'Challenge Completed', space: 'Budgeting Bootcamp', details: 'Completed no-spend week challenge' }
            ]
        },
        {
            id: 6, name: 'Raj Mehta', email: 'raj.mehta@email.com', phone: '+1-555-0106',
            joinDate: daysAgo(150), owner: 'Jordan Lee', nextAction: 'Invite to upcoming webinar',
            interests: ['Tax Planning', 'Investing', 'Financial Independence'],
            notes: 'CPA by profession. Valuable tax expertise.',
            activities: [
                { date: daysAgo(3), type: 'Content Contribution', space: 'Tax Planning Hub', details: 'Published tax season preparation checklist' },
                { date: daysAgo(6), type: 'Forum Post', space: 'Tax Planning Hub', details: 'Answered batch of tax-related questions' },
                { date: daysAgo(10), type: 'Webinar Attended', space: 'Investment Circle', details: 'Attended tax-efficient investing webinar' },
                { date: daysAgo(15), type: 'Mentorship Meeting', space: 'Wealth Building Mentorship', details: 'Advised member on tax implications of freelancing' },
                { date: daysAgo(22), type: 'Study Group Session', space: 'Tax Planning Hub', details: 'Led session on quarterly estimated taxes' },
                { date: daysAgo(28), type: 'Resource Shared', space: 'Financial Literacy Library', details: 'Shared IRS deadline calendar' }
            ]
        },
        {
            id: 7, name: 'Lisa Johansson', email: 'lisa.j@email.com', phone: '+1-555-0107',
            joinDate: daysAgo(200), owner: 'Priya Nair', nextAction: 'Re-engagement call',
            interests: ['Retirement', 'Estate Planning', 'Insurance'],
            notes: 'Was very active, has gone quiet recently. Check in.',
            activities: [
                { date: daysAgo(35), type: 'Forum Post', space: 'Retirement Planning Group', details: 'Asked about pension vs. 401(k) strategies' },
                { date: daysAgo(42), type: 'Webinar Attended', space: 'Community Events', details: 'Attended estate planning basics webinar' },
                { date: daysAgo(55), type: 'Study Group Session', space: 'Retirement Planning Group', details: 'Participated in retirement timeline planning' },
                { date: daysAgo(60), type: 'Forum Comment', space: 'Personal Finance Forum', details: 'Commented on insurance needs analysis post' },
                { date: daysAgo(75), type: 'Event Attendance', space: 'Community Events', details: 'Attended year-end financial review workshop' }
            ]
        },
        {
            id: 8, name: 'Carlos Rivera', email: 'carlos.r@email.com', phone: '+1-555-0108',
            joinDate: daysAgo(180), owner: 'Alex Kim', nextAction: 'Send re-activation email',
            interests: ['Entrepreneurship', 'Business Finance', 'Investing'],
            notes: 'Small business owner. Mentioned being very busy with work.',
            activities: [
                { date: daysAgo(50), type: 'Forum Post', space: 'Personal Finance Forum', details: 'Shared experience with business and personal finance separation' },
                { date: daysAgo(65), type: 'Webinar Attended', space: 'FinTech Innovation Lab', details: 'Attended fintech tools for small business webinar' },
                { date: daysAgo(80), type: 'Question Asked', space: 'Tax Planning Hub', details: 'Asked about quarterly tax payments for businesses' },
                { date: daysAgo(95), type: 'Event Attendance', space: 'Community Events', details: 'Attended networking mixer event' }
            ]
        },
        {
            id: 9, name: 'Fatima Al-Hassan', email: 'fatima.ah@email.com', phone: '+1-555-0109',
            joinDate: daysAgo(45), owner: 'Jordan Lee', nextAction: 'Suggest investment circle',
            interests: ['Ethical Investing', 'Budgeting', 'Financial Literacy'],
            notes: 'Interested in halal/ethical investing options.',
            activities: [
                { date: daysAgo(2), type: 'Forum Post', space: 'Investment Circle', details: 'Started discussion on ethical investing criteria' },
                { date: daysAgo(5), type: 'Study Group Session', space: 'Investment Circle', details: 'Joined ESG investing study group' },
                { date: daysAgo(10), type: 'Webinar Attended', space: 'Community Events', details: 'Attended sustainable investing webinar' },
                { date: daysAgo(15), type: 'Forum Comment', space: 'Budgeting Bootcamp', details: 'Shared tips on values-based spending' },
                { date: daysAgo(22), type: 'Resource Shared', space: 'Financial Literacy Library', details: 'Shared ethical investing research article' }
            ]
        },
        {
            id: 10, name: 'James O\'Brien', email: 'james.ob@email.com', phone: '+1-555-0110',
            joinDate: daysAgo(10), owner: 'Priya Nair', nextAction: 'Welcome and intro to community spaces',
            interests: ['Debt Management', 'Credit Repair', 'Saving'],
            notes: 'Joined specifically for debt management resources.',
            activities: [
                { date: daysAgo(8), type: 'Event Attendance', space: 'Welcome & Onboarding', details: 'Attended orientation and community tour' },
                { date: daysAgo(6), type: 'Question Asked', space: 'Personal Finance Forum', details: 'Asked about debt avalanche vs. snowball methods' },
                { date: daysAgo(3), type: 'Forum Comment', space: 'Budgeting Bootcamp', details: 'Commented on emergency fund strategies' }
            ]
        },
        {
            id: 11, name: 'Priya Sharma', email: 'priya.s@email.com', phone: '+1-555-0111',
            joinDate: daysAgo(100), owner: 'Alex Kim', nextAction: 'Nominate for community award',
            interests: ['FinTech', 'Digital Banking', 'Automation'],
            notes: 'Software engineer passionate about fintech solutions.',
            activities: [
                { date: daysAgo(1), type: 'Content Contribution', space: 'FinTech Innovation Lab', details: 'Shared review of budgeting app comparison' },
                { date: daysAgo(3), type: 'Forum Post', space: 'FinTech Innovation Lab', details: 'Started thread on automation tools for investing' },
                { date: daysAgo(5), type: 'Workshop Participation', space: 'FinTech Innovation Lab', details: 'Led workshop on using APIs for financial tracking' },
                { date: daysAgo(8), type: 'Peer Introduction', space: 'Community Events', details: 'Connected members interested in building fintech projects' },
                { date: daysAgo(11), type: 'Study Group Session', space: 'FinTech Innovation Lab', details: 'Discussed open banking and personal finance integration' },
                { date: daysAgo(14), type: 'Forum Comment', space: 'Personal Finance Forum', details: 'Recommended tools for expense tracking' },
                { date: daysAgo(18), type: 'Resource Shared', space: 'Financial Literacy Library', details: 'Published spreadsheet automation guide' },
                { date: daysAgo(23), type: 'Webinar Attended', space: 'FinTech Innovation Lab', details: 'Attended "Future of Digital Banking" webinar' },
                { date: daysAgo(27), type: 'Challenge Completed', space: 'FinTech Innovation Lab', details: 'Completed financial dashboard building challenge' }
            ]
        },
        {
            id: 12, name: 'Thomas Weber', email: 'thomas.w@email.com', phone: '+1-555-0112',
            joinDate: daysAgo(250), owner: 'Jordan Lee', nextAction: 'Check in with personal message',
            interests: ['Retirement', 'Investing', 'Tax Planning'],
            notes: 'Long-time member. Activity has dropped significantly.',
            activities: [
                { date: daysAgo(60), type: 'Forum Comment', space: 'Retirement Planning Group', details: 'Brief comment on Social Security timing' },
                { date: daysAgo(90), type: 'Webinar Attended', space: 'Community Events', details: 'Attended retirement income strategies webinar' },
                { date: daysAgo(120), type: 'Study Group Session', space: 'Investment Circle', details: 'Participated in bond market discussion' }
            ]
        },
        {
            id: 13, name: 'Nicole Baptiste', email: 'nicole.b@email.com', phone: '+1-555-0113',
            joinDate: daysAgo(75), owner: 'Priya Nair', nextAction: 'Recommend advanced resources',
            interests: ['Investing', 'Options Trading', 'Market Analysis'],
            notes: 'Quick learner. Moving from beginner to intermediate investing.',
            activities: [
                { date: daysAgo(3), type: 'Study Group Session', space: 'Investment Circle', details: 'Attended options trading fundamentals session' },
                { date: daysAgo(7), type: 'Forum Post', space: 'Investment Circle', details: 'Shared first options trade experience and learnings' },
                { date: daysAgo(12), type: 'Webinar Attended', space: 'Investment Circle', details: 'Attended market analysis techniques webinar' },
                { date: daysAgo(18), type: 'Question Asked', space: 'Investment Circle', details: 'Asked about covered call strategies' },
                { date: daysAgo(24), type: 'Forum Comment', space: 'Personal Finance Forum', details: 'Discussed risk management in investing' }
            ]
        },
        {
            id: 14, name: 'Kevin Chang', email: 'kevin.c@email.com', phone: '+1-555-0114',
            joinDate: daysAgo(7), owner: 'Alex Kim', nextAction: 'Invite to study group',
            interests: ['Budgeting', 'Saving', 'First-time Investing'],
            notes: 'Just starting financial journey. Very enthusiastic.',
            activities: [
                { date: daysAgo(5), type: 'Event Attendance', space: 'Welcome & Onboarding', details: 'Completed full onboarding programme' },
                { date: daysAgo(3), type: 'Forum Post', space: 'Personal Finance Forum', details: 'Introduced self and shared financial goals' },
                { date: daysAgo(2), type: 'Question Asked', space: 'Budgeting Bootcamp', details: 'Asked about recommended budgeting methods' },
                { date: daysAgo(1), type: 'Forum Comment', space: 'Personal Finance Forum', details: 'Thanked community for warm welcome' }
            ]
        },
        {
            id: 15, name: 'Maria Gonzalez', email: 'maria.g@email.com', phone: '+1-555-0115',
            joinDate: daysAgo(130), owner: 'Jordan Lee', nextAction: 'Send personal check-in',
            interests: ['Financial Planning', 'Education Savings', 'Insurance'],
            notes: 'Parent focused on education savings. Activity declining.',
            activities: [
                { date: daysAgo(20), type: 'Forum Comment', space: 'Personal Finance Forum', details: 'Commented on 529 plan comparison thread' },
                { date: daysAgo(28), type: 'Webinar Attended', space: 'Community Events', details: 'Attended college savings webinar' },
                { date: daysAgo(45), type: 'Study Group Session', space: 'Retirement Planning Group', details: 'Discussed balancing retirement and education savings' },
                { date: daysAgo(55), type: 'Question Asked', space: 'Personal Finance Forum', details: 'Asked about life insurance options for families' },
                { date: daysAgo(70), type: 'Forum Post', space: 'Personal Finance Forum', details: 'Shared family budgeting template' }
            ]
        },
        {
            id: 16, name: 'Alex Petrov', email: 'alex.p@email.com', phone: '+1-555-0116',
            joinDate: daysAgo(85), owner: 'Priya Nair', nextAction: 'Discuss mentoring opportunity',
            interests: ['Crypto', 'FinTech', 'DeFi'],
            notes: 'Strong knowledge of crypto and blockchain. Shares balanced perspectives.',
            activities: [
                { date: daysAgo(2), type: 'Forum Post', space: 'FinTech Innovation Lab', details: 'Published balanced analysis of crypto market trends' },
                { date: daysAgo(4), type: 'Forum Comment', space: 'Investment Circle', details: 'Addressed misconceptions about crypto investing' },
                { date: daysAgo(7), type: 'Study Group Session', space: 'FinTech Innovation Lab', details: 'Led session on blockchain fundamentals' },
                { date: daysAgo(12), type: 'Resource Shared', space: 'Financial Literacy Library', details: 'Shared beginner guide to crypto safety' },
                { date: daysAgo(16), type: 'Webinar Attended', space: 'FinTech Innovation Lab', details: 'Attended DeFi risks and opportunities webinar' },
                { date: daysAgo(21), type: 'Peer Introduction', space: 'Community Events', details: 'Introduced curious members to crypto study group' },
                { date: daysAgo(26), type: 'Content Contribution', space: 'FinTech Innovation Lab', details: 'Created crypto terminology glossary for beginners' }
            ]
        },
        {
            id: 17, name: 'Diana Kowalski', email: 'diana.k@email.com', phone: '+1-555-0117',
            joinDate: daysAgo(160), owner: 'Alex Kim', nextAction: 'Offer re-engagement incentive',
            interests: ['Saving', 'Real Estate', 'Side Hustles'],
            notes: 'Was moderately active. Stopped engaging after Q1.',
            activities: [
                { date: daysAgo(70), type: 'Forum Post', space: 'Personal Finance Forum', details: 'Asked about house down payment saving strategies' },
                { date: daysAgo(85), type: 'Webinar Attended', space: 'Community Events', details: 'Attended first-time home buyer webinar' },
                { date: daysAgo(100), type: 'Forum Comment', space: 'Budgeting Bootcamp', details: 'Shared side hustle income tracking method' }
            ]
        },
        {
            id: 18, name: 'Ryan Foster', email: 'ryan.f@email.com', phone: '+1-555-0118',
            joinDate: daysAgo(40), owner: 'Jordan Lee', nextAction: 'Connect with investment group',
            interests: ['Investing', 'Stocks', 'Market News'],
            notes: 'Active discussant in investment threads.',
            activities: [
                { date: daysAgo(1), type: 'Forum Comment', space: 'Investment Circle', details: 'Commented on weekly market roundup thread' },
                { date: daysAgo(3), type: 'Forum Post', space: 'Investment Circle', details: 'Shared earnings analysis for tech sector' },
                { date: daysAgo(5), type: 'Study Group Session', space: 'Investment Circle', details: 'Joined stock screening techniques session' },
                { date: daysAgo(9), type: 'Question Asked', space: 'Investment Circle', details: 'Asked about fundamental vs. technical analysis' },
                { date: daysAgo(14), type: 'Webinar Attended', space: 'Investment Circle', details: 'Attended "Reading Financial Statements" webinar' },
                { date: daysAgo(20), type: 'Forum Comment', space: 'Personal Finance Forum', details: 'Discussed importance of emergency fund before investing' },
                { date: daysAgo(27), type: 'Resource Shared', space: 'Financial Literacy Library', details: 'Shared stock analysis worksheet' }
            ]
        }
    ];

    // =============================================
    // STATE
    // =============================================
    let state = {
        members: [],
        currentView: 'overview',
        previousView: null,
        selectedMemberId: null,
        searchQuery: '',
        filterStatus: 'all',
        filterOwner: 'all',
        aiSelectedMember: null,
        aiSelectedAction: null
    };

    // =============================================
    // DATA PERSISTENCE
    // =============================================
    function loadData() {
        const saved = localStorage.getItem('fof_crm_members');
        if (saved) {
            try {
                state.members = JSON.parse(saved);
            } catch (e) {
                state.members = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
            }
        } else {
            state.members = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
        }
    }

    function saveData() {
        localStorage.setItem('fof_crm_members', JSON.stringify(state.members));
    }

    function resetData() {
        state.members = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
        saveData();
        showToast('Data reset to defaults', 'info');
        renderCurrentView();
    }

    // =============================================
    // UTILITY FUNCTIONS
    // =============================================
    function getInitials(name) {
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    }

    function getAvatarColor(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
        return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function formatRelativeDate(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        const diffMs = today - d;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }

    function daysSinceJoined(joinDate) {
        return Math.floor((today - new Date(joinDate + 'T00:00:00')) / (1000 * 60 * 60 * 24));
    }

    function getActivitiesInLastDays(activities, days) {
        const cutoff = new Date(today);
        cutoff.setDate(cutoff.getDate() - days);
        return activities.filter(a => new Date(a.date + 'T00:00:00') >= cutoff);
    }

    // =============================================
    // STATUS CLASSIFICATION
    // Rules:
    //   Newly Joined  — Joined within 30 days
    //   Highly Active  — 8+ activities in last 30 days
    //   Active         — 3–7 activities in last 30 days
    //   At Risk        — Joined 30+ days ago, 1–2 activities in last 30 days,
    //                     AND had 3+ activities in the 30 days before that
    //   Dormant        — Joined 30+ days ago, 0 activities in last 30 days
    //   (fallback: Active if 1-2 recent but no prior activity to compare)
    // =============================================
    function classifyMember(member) {
        const daysSince = daysSinceJoined(member.joinDate);
        const recent = getActivitiesInLastDays(member.activities, 30);
        const recentCount = recent.length;

        if (daysSince <= 30) return 'Newly Joined';

        if (recentCount >= 8) return 'Highly Active';
        if (recentCount >= 3) return 'Active';

        if (recentCount === 0) return 'Dormant';

        // 1-2 recent activities — check if declining from previous 30 days
        const prior = member.activities.filter(a => {
            const ad = new Date(a.date + 'T00:00:00');
            const cutoff30 = new Date(today); cutoff30.setDate(cutoff30.getDate() - 30);
            const cutoff60 = new Date(today); cutoff60.setDate(cutoff60.getDate() - 60);
            return ad >= cutoff60 && ad < cutoff30;
        });

        if (prior.length >= 3) return 'At Risk';
        return 'Active';
    }

    function getStatusClass(status) {
        return status.toLowerCase().replace(/\s+/g, '-');
    }

    function getNextId() {
        return state.members.length > 0 ? Math.max(...state.members.map(m => m.id)) + 1 : 1;
    }

    // =============================================
    // TOAST NOTIFICATIONS
    // =============================================
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    }

    // =============================================
    // NAVIGATION
    // =============================================
    function switchView(viewName, memberId = null) {
        if (viewName === 'member-detail' && memberId) {
            state.previousView = state.currentView;
            state.selectedMemberId = memberId;
        }
        state.currentView = viewName;
        document.querySelectorAll('.view-container').forEach(el => el.style.display = 'none');
        const target = document.getElementById(`view-${viewName}`);
        if (target) {
            target.style.display = '';
            target.style.animation = 'none';
            target.offsetHeight; // trigger reflow
            target.style.animation = '';
        }
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const navItem = document.querySelector(`[data-view="${viewName}"]`);
        if (navItem) navItem.classList.add('active');

        renderCurrentView();

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
    }

    function renderCurrentView() {
        switch (state.currentView) {
            case 'overview': renderOverview(); break;
            case 'all-members': renderAllMembers(); break;
            case 'new-members': renderNewMembers(); break;
            case 'highly-active': renderHighlyActive(); break;
            case 'at-risk': renderAtRisk(); break;
            case 'follow-up': renderFollowUp(); break;
            case 'ai-assistant': renderAIAssistant(); break;
            case 'member-detail': renderMemberDetail(); break;
            case 'help': renderHelp(); break;
        }
    }

    // =============================================
    // RENDER: Overview
    // =============================================
    function renderOverview() {
        const members = state.members;
        const stats = getStatusCounts();
        const recentActivities = getAllRecentActivities(10);
        const spaceDistribution = getSpaceDistribution();

        const container = document.getElementById('view-overview');
        container.innerHTML = `
            <div class="view-header">
                <h1>Community Overview</h1>
                <p>Monitor member engagement across the Friends of Finance community</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card" data-type="total" onclick="window.CRM.switchView('all-members')">
                    <div class="stat-label">Total Members</div>
                    <div class="stat-value">${members.length}</div>
                    <div class="stat-trend">All registered members</div>
                </div>
                <div class="stat-card" data-type="new" onclick="window.CRM.switchView('new-members')">
                    <div class="stat-label">Newly Joined</div>
                    <div class="stat-value">${stats['Newly Joined']}</div>
                    <div class="stat-trend">Joined within 30 days</div>
                </div>
                <div class="stat-card" data-type="active">
                    <div class="stat-label">Active</div>
                    <div class="stat-value">${stats['Active']}</div>
                    <div class="stat-trend">3–7 activities / 30 days</div>
                </div>
                <div class="stat-card" data-type="highly-active" onclick="window.CRM.switchView('highly-active')">
                    <div class="stat-label">Highly Active</div>
                    <div class="stat-value">${stats['Highly Active']}</div>
                    <div class="stat-trend">8+ activities / 30 days</div>
                </div>
                <div class="stat-card" data-type="at-risk" onclick="window.CRM.switchView('at-risk')">
                    <div class="stat-label">At Risk</div>
                    <div class="stat-value">${stats['At Risk']}</div>
                    <div class="stat-trend">Declining engagement</div>
                </div>
                <div class="stat-card" data-type="dormant" onclick="window.CRM.switchView('at-risk')">
                    <div class="stat-label">Dormant</div>
                    <div class="stat-value">${stats['Dormant']}</div>
                    <div class="stat-trend">No activity in 30 days</div>
                </div>
            </div>

            <div class="overview-grid">
                <div class="card">
                    <div class="card-header">
                        <h3>Recent Community Activity</h3>
                        <button class="btn btn-ghost btn-sm" onclick="window.CRM.switchView('all-members')">View all →</button>
                    </div>
                    <ul class="recent-activity-list">
                        ${recentActivities.map(a => `
                            <li class="recent-activity-item" onclick="window.CRM.switchView('member-detail', ${a.memberId})" style="cursor:pointer">
                                <div class="member-avatar" style="background:${getAvatarColor(a.memberName)}">${getInitials(a.memberName)}</div>
                                <div class="activity-text"><strong>${escapeHtml(a.memberName)}</strong> — ${escapeHtml(a.type)} in ${escapeHtml(a.space)}</div>
                                <div class="activity-time">${formatRelativeDate(a.date)}</div>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3>Activity by Space</h3>
                    </div>
                    <ul class="space-chart">
                        ${spaceDistribution.slice(0, 7).map((s, i) => `
                            <li class="space-chart-item">
                                <div class="space-chart-label">
                                    <span>${escapeHtml(s.space)}</span>
                                    <span>${s.count}</span>
                                </div>
                                <div class="space-chart-bar">
                                    <div class="space-chart-fill" style="width:${s.pct}%;background:${AVATAR_COLORS[i % AVATAR_COLORS.length]}"></div>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Members Needing Follow-Up</h3>
                    <button class="btn btn-ghost btn-sm" onclick="window.CRM.switchView('follow-up')">View queue →</button>
                </div>
                <div class="table-wrapper" style="border:none;">
                    <table class="data-table">
                        <thead>
                            <tr><th>Member</th><th>Status</th><th>Owner</th><th>Next Action</th><th>Last Active</th></tr>
                        </thead>
                        <tbody>
                            ${getFollowUpMembers().slice(0, 5).map(m => {
                                const status = classifyMember(m);
                                const lastAct = m.activities.length ? m.activities.sort((a,b) => b.date.localeCompare(a.date))[0].date : m.joinDate;
                                return `
                                <tr onclick="window.CRM.switchView('member-detail', ${m.id})">
                                    <td>
                                        <div class="member-cell">
                                            <div class="member-avatar" style="background:${getAvatarColor(m.name)}">${getInitials(m.name)}</div>
                                            <div>
                                                <div class="member-name-col">${escapeHtml(m.name)}</div>
                                                <div class="member-email-col">${escapeHtml(m.email)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="status-badge ${getStatusClass(status)}">${status}</span></td>
                                    <td>${escapeHtml(m.owner)}</td>
                                    <td>${escapeHtml(m.nextAction || '—')}</td>
                                    <td>${formatRelativeDate(lastAct)}</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function getStatusCounts() {
        const counts = { 'Newly Joined': 0, 'Active': 0, 'Highly Active': 0, 'At Risk': 0, 'Dormant': 0 };
        state.members.forEach(m => { counts[classifyMember(m)]++; });
        return counts;
    }

    function getAllRecentActivities(limit) {
        const all = [];
        state.members.forEach(m => {
            m.activities.forEach(a => {
                all.push({ ...a, memberId: m.id, memberName: m.name });
            });
        });
        all.sort((a, b) => b.date.localeCompare(a.date));
        return all.slice(0, limit);
    }

    function getSpaceDistribution() {
        const counts = {};
        state.members.forEach(m => {
            m.activities.forEach(a => {
                counts[a.space] = (counts[a.space] || 0) + 1;
            });
        });
        const entries = Object.entries(counts).map(([space, count]) => ({ space, count }));
        entries.sort((a, b) => b.count - a.count);
        const max = entries[0]?.count || 1;
        entries.forEach(e => e.pct = Math.round((e.count / max) * 100));
        return entries;
    }

    function getFollowUpMembers() {
        return state.members.filter(m => {
            const status = classifyMember(m);
            return status === 'At Risk' || status === 'Dormant' || status === 'Newly Joined' || m.nextAction;
        }).sort((a, b) => {
            const order = { 'At Risk': 0, 'Dormant': 1, 'Newly Joined': 2, 'Active': 3, 'Highly Active': 4 };
            return (order[classifyMember(a)] || 3) - (order[classifyMember(b)] || 3);
        });
    }

    // =============================================
    // RENDER: All Members
    // =============================================
    function renderAllMembers() {
        const container = document.getElementById('view-all-members');
        let filtered = getFilteredMembers();

        container.innerHTML = `
            <div class="view-header">
                <h1>All Members</h1>
                <p>${filtered.length} member${filtered.length !== 1 ? 's' : ''} found</p>
            </div>

            <div class="filter-bar">
                <span class="filter-label">Filter by:</span>
                <select id="filter-status" onchange="window.CRM.onFilterChange()">
                    <option value="all">All Statuses</option>
                    <option value="Newly Joined" ${state.filterStatus==='Newly Joined'?'selected':''}>Newly Joined</option>
                    <option value="Active" ${state.filterStatus==='Active'?'selected':''}>Active</option>
                    <option value="Highly Active" ${state.filterStatus==='Highly Active'?'selected':''}>Highly Active</option>
                    <option value="At Risk" ${state.filterStatus==='At Risk'?'selected':''}>At Risk</option>
                    <option value="Dormant" ${state.filterStatus==='Dormant'?'selected':''}>Dormant</option>
                </select>
                <select id="filter-owner" onchange="window.CRM.onFilterChange()">
                    <option value="all">All Owners</option>
                    ${OWNERS.map(o => `<option value="${o}" ${state.filterOwner===o?'selected':''}>${o}</option>`).join('')}
                </select>
                <button class="btn btn-ghost btn-sm" onclick="window.CRM.resetFilters()">Clear filters</button>
            </div>

            <div class="table-wrapper">
                <table class="data-table" id="members-table">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Activities (30d)</th>
                            <th>Last Active</th>
                            <th>Owner</th>
                            <th>Next Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtered.map(m => renderMemberRow(m)).join('')}
                    </tbody>
                </table>
                ${filtered.length === 0 ? '<div class="empty-state"><h3>No members match your filters</h3><p>Try adjusting the search or filter criteria</p></div>' : ''}
            </div>
        `;
    }

    function renderMemberRow(m) {
        const status = classifyMember(m);
        const recent30 = getActivitiesInLastDays(m.activities, 30).length;
        const lastAct = m.activities.length ? m.activities.sort((a,b) => b.date.localeCompare(a.date))[0].date : m.joinDate;

        return `
            <tr onclick="window.CRM.switchView('member-detail', ${m.id})">
                <td>
                    <div class="member-cell">
                        <div class="member-avatar" style="background:${getAvatarColor(m.name)}">${getInitials(m.name)}</div>
                        <div>
                            <div class="member-name-col">${escapeHtml(m.name)}</div>
                            <div class="member-email-col">${escapeHtml(m.email)}</div>
                        </div>
                    </div>
                </td>
                <td><span class="status-badge ${getStatusClass(status)}">${status}</span></td>
                <td>${formatDate(m.joinDate)}</td>
                <td><strong>${recent30}</strong></td>
                <td>${formatRelativeDate(lastAct)}</td>
                <td>${escapeHtml(m.owner)}</td>
                <td>${escapeHtml(m.nextAction || '—')}</td>
            </tr>
        `;
    }

    function getFilteredMembers() {
        let list = [...state.members];
        const q = state.searchQuery.toLowerCase().trim();
        if (q) {
            list = list.filter(m =>
                m.name.toLowerCase().includes(q) ||
                m.email.toLowerCase().includes(q) ||
                m.interests.some(i => i.toLowerCase().includes(q))
            );
        }
        if (state.filterStatus !== 'all') {
            list = list.filter(m => classifyMember(m) === state.filterStatus);
        }
        if (state.filterOwner !== 'all') {
            list = list.filter(m => m.owner === state.filterOwner);
        }
        return list;
    }

    // =============================================
    // RENDER: Focused Views (New, Highly Active, At-Risk)
    // =============================================
    function renderNewMembers() {
        const members = state.members.filter(m => classifyMember(m) === 'Newly Joined');
        renderFocusedView('view-new-members', 'Newly Joined Members', `${members.length} member${members.length!==1?'s':''} joined within the last 30 days`, members, 'newly-joined');
    }

    function renderHighlyActive() {
        const members = state.members.filter(m => classifyMember(m) === 'Highly Active');
        renderFocusedView('view-highly-active', 'Highly Active Members', `${members.length} member${members.length!==1?'s':''} with 8+ activities in the last 30 days`, members, 'highly-active');
    }

    function renderAtRisk() {
        const atRisk = state.members.filter(m => classifyMember(m) === 'At Risk');
        const dormant = state.members.filter(m => classifyMember(m) === 'Dormant');
        const combined = [...atRisk, ...dormant];
        renderFocusedView('view-at-risk', 'At Risk & Dormant Members', `${atRisk.length} at risk, ${dormant.length} dormant — these members need attention`, combined, 'at-risk');
    }

    function renderFocusedView(containerId, title, subtitle, members, accentClass) {
        const container = document.getElementById(containerId);
        container.innerHTML = `
            <div class="view-header">
                <h1>${title}</h1>
                <p>${subtitle}</p>
            </div>
            ${members.length === 0 ? `
                <div class="empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    <h3>No members in this category</h3>
                    <p>That's great news!</p>
                </div>
            ` : `
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr><th>Member</th><th>Status</th><th>Joined</th><th>Activities (30d)</th><th>Last Active</th><th>Owner</th><th>Next Action</th></tr>
                        </thead>
                        <tbody>
                            ${members.map(m => renderMemberRow(m)).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        `;
    }

    // =============================================
    // RENDER: Follow-Up Queue
    // =============================================
    function renderFollowUp() {
        const members = getFollowUpMembers();
        const container = document.getElementById('view-follow-up');

        container.innerHTML = `
            <div class="view-header">
                <h1>Follow-Up Queue</h1>
                <p>${members.length} member${members.length !== 1 ? 's' : ''} require attention or have pending actions</p>
            </div>

            <div class="followup-grid">
                ${members.map(m => {
                    const status = classifyMember(m);
                    const lastAct = m.activities.length ? m.activities.sort((a,b) => b.date.localeCompare(a.date))[0] : null;
                    return `
                    <div class="followup-card" onclick="window.CRM.switchView('member-detail', ${m.id})">
                        <div class="followup-card-header">
                            <div class="member-cell">
                                <div class="member-avatar" style="background:${getAvatarColor(m.name)}">${getInitials(m.name)}</div>
                                <div>
                                    <div class="member-name-col">${escapeHtml(m.name)}</div>
                                    <div class="member-email-col">${escapeHtml(m.email)}</div>
                                </div>
                            </div>
                            <span class="status-badge ${getStatusClass(status)}">${status}</span>
                        </div>
                        <div class="followup-card-body">
                            <p><span class="label">Owner:</span> ${escapeHtml(m.owner)}</p>
                            <p><span class="label">Next Action:</span> ${escapeHtml(m.nextAction || 'Not set')}</p>
                            ${lastAct ? `<p><span class="label">Last Activity:</span> ${escapeHtml(lastAct.type)} — ${formatRelativeDate(lastAct.date)}</p>` : '<p><span class="label">Last Activity:</span> None recorded</p>'}
                        </div>
                        <div class="followup-actions">
                            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();window.CRM.openRecordActivity(${m.id})">Record Activity</button>
                            <button class="btn btn-ai btn-sm" onclick="event.stopPropagation();window.CRM.openAIForMember(${m.id})">✨ AI Suggest</button>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        `;
    }

    // =============================================
    // RENDER: Member Detail
    // =============================================
    function renderMemberDetail() {
        const m = state.members.find(m => m.id === state.selectedMemberId);
        if (!m) return;

        const status = classifyMember(m);
        const recent30 = getActivitiesInLastDays(m.activities, 30).length;
        const totalAct = m.activities.length;
        const sortedAct = [...m.activities].sort((a, b) => b.date.localeCompare(a.date));
        const container = document.getElementById('view-member-detail');

        container.innerHTML = `
            <button class="back-btn" onclick="window.CRM.goBack()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back
            </button>

            <div class="detail-header">
                <div class="detail-avatar" style="background:${getAvatarColor(m.name)}">${getInitials(m.name)}</div>
                <div class="detail-info">
                    <h1>${escapeHtml(m.name)} <span class="status-badge ${getStatusClass(status)}">${status}</span></h1>
                    <div class="detail-meta">
                        <div class="detail-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            ${escapeHtml(m.email)}
                        </div>
                        <div class="detail-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            ${escapeHtml(m.phone || 'No phone')}
                        </div>
                        <div class="detail-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            Joined ${formatDate(m.joinDate)} (${daysSinceJoined(m.joinDate)} days ago)
                        </div>
                    </div>
                </div>
                <div class="detail-actions">
                    <button class="btn btn-primary btn-sm" onclick="window.CRM.openRecordActivity(${m.id})">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Record Activity
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="window.CRM.openEditMember(${m.id})">Edit Member</button>
                    <button class="btn btn-ai btn-sm" onclick="window.CRM.openAIForMember(${m.id})">✨ AI Assist</button>
                </div>
            </div>

            <div class="detail-grid">
                <div class="detail-section">
                    <h3>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                        Member Information
                    </h3>
                    <ul class="info-list">
                        <li><span class="info-label">Owner</span><span class="info-value">${escapeHtml(m.owner)}</span></li>
                        <li><span class="info-label">Next Action</span><span class="info-value">${escapeHtml(m.nextAction || 'None set')}</span></li>
                        <li><span class="info-label">Total Activities</span><span class="info-value">${totalAct}</span></li>
                        <li><span class="info-label">Activities (30 days)</span><span class="info-value">${recent30}</span></li>
                        <li><span class="info-label">Status</span><span class="info-value"><span class="status-badge ${getStatusClass(status)}">${status}</span></span></li>
                    </ul>
                </div>

                <div class="detail-section">
                    <h3>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        Interests & Notes
                    </h3>
                    <div class="tag-list" style="margin-bottom:12px;">
                        ${m.interests.map(i => `<span class="tag">${escapeHtml(i)}</span>`).join('')}
                    </div>
                    <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;">${escapeHtml(m.notes || 'No notes added.')}</p>
                </div>

                <div class="detail-section full-width">
                    <h3>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        Activity History (${totalAct} total)
                    </h3>
                    ${sortedAct.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">No activities recorded yet.</p>' : `
                    <ul class="timeline">
                        ${sortedAct.map(a => `
                            <li class="timeline-item">
                                <div class="timeline-date">${formatDate(a.date)} · ${formatRelativeDate(a.date)}</div>
                                <div class="timeline-title">${escapeHtml(a.type)}</div>
                                <div class="timeline-space">${escapeHtml(a.space)}</div>
                                ${a.details ? `<div class="timeline-detail">${escapeHtml(a.details)}</div>` : ''}
                            </li>
                        `).join('')}
                    </ul>`}
                </div>
            </div>
        `;
    }

    // =============================================
    // RENDER: AI Assistant
    // =============================================
    function renderAIAssistant() {
        const container = document.getElementById('view-ai-assistant');

        container.innerHTML = `
            <div class="view-header">
                <h1>AI Assistant <span class="ai-label">SIMULATED</span></h1>
                <p>Get AI-powered suggestions for member engagement. All output is simulated — no real AI model is used.</p>
            </div>

            <div class="ai-banner">
                <div class="ai-banner-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.92L12 22"/><path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.57 3.25 3.92"/><line x1="4.5" y1="9" x2="19.5" y2="9"/><path d="M8 15h8"/><path d="M9 18h6"/></svg>
                </div>
                <div class="ai-banner-text">
                    <h3>Safeguards</h3>
                    <p>This AI assistant will <strong>never</strong> send messages automatically, invent personalisation, or treat engagement as buying intent. Any possible commercial signal is flagged separately and requires human review. All suggestions are for the community manager to evaluate and act upon manually.</p>
                </div>
            </div>

            <div class="ai-select-wrapper">
                <span class="filter-label">Select a member:</span>
                <select id="ai-member-select" onchange="window.CRM.onAIMemberChange()" style="min-width:220px;padding:8px 12px;background:var(--bg-input);border:1px solid var(--border-color);border-radius:var(--radius-md);color:var(--text-primary);font-family:var(--font-sans);font-size:0.85rem;">
                    <option value="">Choose a member…</option>
                    ${state.members.map(m => `<option value="${m.id}" ${state.aiSelectedMember==m.id?'selected':''}>${m.name} (${classifyMember(m)})</option>`).join('')}
                </select>
            </div>

            <h3 style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">Choose an AI action:</h3>
            <div class="ai-action-grid">
                <div class="ai-action-card ${state.aiSelectedAction==='summary'?'selected':''}" onclick="window.CRM.selectAIAction('summary')">
                    <h4>📊 Summarise Activity</h4>
                    <p>Generate a concise overview of the member's engagement patterns and community participation.</p>
                </div>
                <div class="ai-action-card ${state.aiSelectedAction==='suggest-space'?'selected':''}" onclick="window.CRM.selectAIAction('suggest-space')">
                    <h4>🧭 Suggest Community Space</h4>
                    <p>Recommend a community space or peer introduction based on the member's interests and activity.</p>
                </div>
                <div class="ai-action-card ${state.aiSelectedAction==='draft-message'?'selected':''}" onclick="window.CRM.selectAIAction('draft-message')">
                    <h4>✉️ Draft Activation Message</h4>
                    <p>Create a personalised outreach message to re-engage or activate the member.</p>
                </div>
                <div class="ai-action-card ${state.aiSelectedAction==='next-step'?'selected':''}" onclick="window.CRM.selectAIAction('next-step')">
                    <h4>🎯 Recommend Next Step</h4>
                    <p>Suggest the most impactful next action for the community manager to take.</p>
                </div>
            </div>

            <button class="btn btn-ai" id="btn-run-ai" onclick="window.CRM.runAI()" ${!state.aiSelectedMember || !state.aiSelectedAction ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                ✨ Generate Suggestion
            </button>

            <div id="ai-output-area"></div>

            <div class="signal-separator" style="margin-top:24px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <div>
                    <strong>Commercial Signal Separation:</strong> This AI analyses community engagement only. Any potential commercial interest (e.g., a member asking about paid services) would be flagged separately with a <span class="commercial-flag">COMMERCIAL SIGNAL</span> label and routed for human review. Engagement scores are never treated as buying intent.
                </div>
            </div>
        `;
    }

    function selectAIAction(action) {
        state.aiSelectedAction = action;
        renderAIAssistant();
    }

    function onAIMemberChange() {
        const sel = document.getElementById('ai-member-select');
        state.aiSelectedMember = sel.value ? parseInt(sel.value) : null;
        renderAIAssistant();
    }

    function runAI() {
        if (!state.aiSelectedMember || !state.aiSelectedAction) return;

        const m = state.members.find(m => m.id === state.aiSelectedMember);
        if (!m) return;

        const outputArea = document.getElementById('ai-output-area');
        outputArea.innerHTML = `<div class="ai-loading"><div class="ai-spinner"></div>Generating suggestion…</div>`;

        // Simulate delay
        setTimeout(() => {
            const result = generateAIOutput(m, state.aiSelectedAction);
            outputArea.innerHTML = `
                <div class="ai-output">
                    <div class="ai-output-content">${result}</div>
                </div>
            `;
        }, 1200);
    }

    function generateAIOutput(member, action) {
        const status = classifyMember(member);
        const recent = getActivitiesInLastDays(member.activities, 30);
        const recentCount = recent.length;
        const totalCount = member.activities.length;
        const topSpaces = getTopSpaces(member);
        const topTypes = getTopTypes(member);

        switch (action) {
            case 'summary':
                return generateSummary(member, status, recentCount, totalCount, topSpaces, topTypes);
            case 'suggest-space':
                return generateSpaceSuggestion(member, status, topSpaces);
            case 'draft-message':
                return generateDraftMessage(member, status, topSpaces, recentCount);
            case 'next-step':
                return generateNextStep(member, status, recentCount, topSpaces);
            default:
                return '<p>Unknown action.</p>';
        }
    }

    function getTopSpaces(member) {
        const counts = {};
        member.activities.forEach(a => counts[a.space] = (counts[a.space] || 0) + 1);
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => e[0]);
    }

    function getTopTypes(member) {
        const counts = {};
        member.activities.forEach(a => counts[a.type] = (counts[a.type] || 0) + 1);
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => e[0]);
    }

    function generateSummary(m, status, recentCount, totalCount, topSpaces, topTypes) {
        const joinedDays = daysSinceJoined(m.joinDate);
        return `
            <p><strong>${escapeHtml(m.name)}</strong> joined the community <strong>${joinedDays} days ago</strong> and is currently classified as <strong>${status}</strong>.</p>
            <p>Over their membership, they have logged <strong>${totalCount} activities</strong> in total, with <strong>${recentCount} in the last 30 days</strong>.</p>
            ${topSpaces.length ? `<p>Their most frequented spaces are: <strong>${topSpaces.map(s => escapeHtml(s)).join(', ')}</strong>.</p>` : ''}
            ${topTypes.length ? `<p>Primary activity types: <strong>${topTypes.map(t => escapeHtml(t)).join(', ')}</strong>.</p>` : ''}
            <p>${status === 'Dormant' ? 'This member has not engaged in 30+ days and may benefit from a personal check-in or tailored content invitation.' :
               status === 'At Risk' ? 'Engagement is declining. Consider a proactive outreach before the member becomes dormant.' :
               status === 'Newly Joined' ? 'As a new member, early engagement is critical. Ensure they feel welcomed and connected.' :
               status === 'Highly Active' ? 'This is a star contributor! Consider recognising their contributions or inviting them to a leadership role.' :
               'Engagement is healthy. Continue nurturing through relevant content and community events.'}</p>
        `;
    }

    function generateSpaceSuggestion(m, status, topSpaces) {
        const allSpaces = COMMUNITY_SPACES.filter(s => !topSpaces.includes(s));
        const suggestedSpace = allSpaces[Math.floor(m.name.length * 1.3) % allSpaces.length];
        const interests = m.interests.join(', ');

        // Find a potential peer match
        const peerCandidates = state.members.filter(other =>
            other.id !== m.id &&
            other.interests.some(i => m.interests.includes(i)) &&
            classifyMember(other) !== 'Dormant'
        );
        const peer = peerCandidates.length ? peerCandidates[0] : null;

        return `
            <p>Based on <strong>${escapeHtml(m.name)}</strong>'s interests (${escapeHtml(interests)}) and activity patterns:</p>
            <p><strong>Recommended Space:</strong> <span class="tag">${escapeHtml(suggestedSpace)}</span></p>
            <p>This space aligns with their interests and would expose them to discussions and resources they haven't yet explored. ${topSpaces.length ? `They've been most active in ${topSpaces.map(s => escapeHtml(s)).join(' and ')}, so branching out could broaden their experience.` : ''}</p>
            ${peer ? `<p><strong>Suggested Peer Introduction:</strong> Consider connecting them with <strong>${escapeHtml(peer.name)}</strong>, who shares interests in ${peer.interests.filter(i => m.interests.includes(i)).map(i => escapeHtml(i)).join(', ')}.</p>` : ''}
            <p><em>Note: Any introduction should be facilitated by the community manager with both members' awareness.</em></p>
        `;
    }

    function generateDraftMessage(m, status, topSpaces, recentCount) {
        let message = '';
        if (status === 'Dormant' || status === 'At Risk') {
            message = `Hi ${m.name.split(' ')[0]},\n\nHope you're doing well! We've noticed it's been a while since you've been active in the Friends of Finance community, and we wanted to check in.\n\n${topSpaces.length ? `The ${topSpaces[0]} has had some great discussions recently that might interest you.` : 'There have been some exciting new discussions and resources added recently.'}\n\nNo pressure at all — we just wanted you to know the community is here for you whenever you're ready. Is there anything we can help with?\n\nWarm regards,\nThe Friends of Finance Team`;
        } else if (status === 'Newly Joined') {
            message = `Hi ${m.name.split(' ')[0]},\n\nWelcome to Friends of Finance! We're thrilled to have you here.\n\nBased on your interests, you might enjoy checking out ${topSpaces.length ? `the ${topSpaces[0]}` : 'our various community spaces'} where members share insights and support each other's financial journeys.\n\nFeel free to introduce yourself, ask questions, or just browse — there's no wrong way to get started!\n\nLooking forward to seeing you around,\nThe Friends of Finance Team`;
        } else {
            message = `Hi ${m.name.split(' ')[0]},\n\nJust wanted to drop a quick note to say thanks for being such an engaged member of Friends of Finance! Your ${recentCount} recent activities have been valuable to the community.\n\n${topSpaces.length > 1 ? `Your contributions in ${topSpaces[0]} and ${topSpaces[1]} are really appreciated.` : 'Your contributions are really appreciated.'}\n\nIs there anything we can do to make your experience even better?\n\nBest,\nThe Friends of Finance Team`;
        }

        return `
            <p><strong>Draft message for ${escapeHtml(m.name)}:</strong></p>
            <div style="background:var(--bg-input);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:16px;margin:12px 0;white-space:pre-line;font-size:0.85rem;line-height:1.7;color:var(--text-secondary);">${escapeHtml(message)}</div>
            <p style="font-size:0.78rem;color:var(--accent-gold);">⚠️ <strong>Important:</strong> Review and personalise this draft before sending. The AI does not send messages automatically. Verify all details and adapt the tone to your relationship with this member.</p>
        `;
    }

    function generateNextStep(m, status, recentCount, topSpaces) {
        let step = '';
        let reasoning = '';

        switch (status) {
            case 'Newly Joined':
                step = 'Schedule a personal welcome call or send a curated welcome pack';
                reasoning = `${escapeHtml(m.name)} joined ${daysSinceJoined(m.joinDate)} days ago. Early personal contact dramatically improves long-term retention. Focus on understanding their goals and connecting them with relevant spaces.`;
                break;
            case 'Highly Active':
                step = 'Recognise their contributions and invite to a mentorship or leadership role';
                reasoning = `With ${recentCount} activities in the last 30 days, ${escapeHtml(m.name)} is a community champion. Formal recognition prevents burnout and channels their energy productively. Consider a community spotlight feature or mentor invitation.`;
                break;
            case 'Active':
                step = `Invite to upcoming event in ${topSpaces.length ? escapeHtml(topSpaces[0]) : 'their area of interest'}`;
                reasoning = `${escapeHtml(m.name)} is steadily engaged. The goal is to deepen their involvement without being intrusive. A targeted invitation to content matching their interests keeps momentum going.`;
                break;
            case 'At Risk':
                step = 'Send a personal check-in message and ask for feedback';
                reasoning = `${escapeHtml(m.name)}'s activity has declined recently. A genuine, no-pressure check-in shows the community cares. Ask if something changed or if they need different types of content/support.`;
                break;
            case 'Dormant':
                step = 'Send a re-engagement email highlighting what theyve missed';
                reasoning = `${escapeHtml(m.name)} hasn't been active in 30+ days. A summary of recent community highlights relevant to their interests (${m.interests.map(i => escapeHtml(i)).join(', ')}) can reignite interest. Keep the tone warm and pressure-free.`;
                break;
        }

        return `
            <p><strong>Recommended Next Step:</strong></p>
            <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.15);border-radius:var(--radius-md);padding:16px;margin:12px 0;">
                <p style="font-size:1rem;font-weight:600;color:var(--accent-primary-hover);margin-bottom:8px;">🎯 ${step}</p>
                <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;">${reasoning}</p>
            </div>
            <p style="font-size:0.82rem;color:var(--text-muted);">This recommendation is based on the member's current status (<strong>${status}</strong>), activity patterns, and community best practices. The community manager should use their judgement to adapt this suggestion.</p>
        `;
    }

    // =============================================
    // RENDER: Help Section
    // =============================================
    function renderHelp() {
        const container = document.getElementById('view-help');
        container.innerHTML = `
            <div class="view-header">
                <h1>Help & Guide</h1>
                <p>Everything you need to know about using the Friends of Finance Community CRM</p>
            </div>

            <div class="help-content">
                <div class="help-section open">
                    <div class="help-section-header" onclick="window.CRM.toggleHelp(this)">
                        <h3>🛠 Tool Overview</h3>
                        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <div class="help-section-body">
                        <p>This CRM is a <strong>custom-built, single-page web application</strong> designed specifically for managing the <strong>Friends of Finance</strong> community. It runs entirely in the browser with no backend — data is persisted in <code>localStorage</code>.</p>
                        <p><strong>Technology:</strong> HTML, CSS (vanilla), and JavaScript (vanilla). No frameworks or libraries. Hosted as a static site.</p>
                        <p><strong>Key features:</strong></p>
                        <ul>
                            <li>Add, edit, and manage community members</li>
                            <li>Record and view activity history per member</li>
                            <li>Automatic status classification based on activity rules</li>
                            <li>Search and filter across all members</li>
                            <li>Follow-up queue for at-risk and dormant members</li>
                            <li>Focused views for new, highly active, and at-risk/dormant members</li>
                            <li>AI-assisted suggestions (simulated)</li>
                            <li>Owner assignment and next action tracking</li>
                        </ul>
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-section-header" onclick="window.CRM.toggleHelp(this)">
                        <h3>📊 Activity-State Classification Rules</h3>
                        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <div class="help-section-body">
                        <p>Every member is automatically classified into one of five states based on their join date and activity frequency:</p>
                        <table class="help-table">
                            <thead>
                                <tr><th>Status</th><th>Rule</th><th>Colour</th></tr>
                            </thead>
                            <tbody>
                                <tr><td><strong>Newly Joined</strong></td><td>Joined within the last 30 days, regardless of activity level</td><td><span style="color:var(--status-new)">● Blue</span></td></tr>
                                <tr><td><strong>Highly Active</strong></td><td>8 or more activities in the last 30 days (joined 30+ days ago)</td><td><span style="color:var(--status-highly-active)">● Indigo</span></td></tr>
                                <tr><td><strong>Active</strong></td><td>3–7 activities in the last 30 days (joined 30+ days ago)</td><td><span style="color:var(--status-active)">● Green</span></td></tr>
                                <tr><td><strong>At Risk</strong></td><td>1–2 activities in last 30 days AND had 3+ activities in the previous 30 days (showing decline)</td><td><span style="color:var(--status-at-risk)">● Amber</span></td></tr>
                                <tr><td><strong>Dormant</strong></td><td>Zero activities in the last 30 days (joined 30+ days ago)</td><td><span style="color:var(--status-dormant)">● Red</span></td></tr>
                            </tbody>
                        </table>
                        <p>Classification is recalculated in real-time whenever data changes. "Newly Joined" takes priority — even highly active new members are classified as Newly Joined until 30 days have passed.</p>
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-section-header" onclick="window.CRM.toggleHelp(this)">
                        <h3>🤖 AI Feature</h3>
                        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <div class="help-section-body">
                        <p><strong>Status: SIMULATED</strong> — The AI Assistant does not use a real AI model. All suggestions are generated using rule-based logic matching on the member's activity history, status, and interests.</p>
                        <p><strong>Available actions:</strong></p>
                        <ul>
                            <li><strong>Summarise Activity</strong> — Generates an overview of engagement patterns</li>
                            <li><strong>Suggest Community Space</strong> — Recommends unexplored spaces and potential peer introductions</li>
                            <li><strong>Draft Activation Message</strong> — Creates a personalised outreach draft for review</li>
                            <li><strong>Recommend Next Step</strong> — Suggests the best action based on member status</li>
                        </ul>
                        <p><strong>How to use:</strong> Navigate to "AI Assistant" in the sidebar, select a member and an action, then click "Generate Suggestion". You can also access it from a member's detail page or follow-up card.</p>
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-section-header" onclick="window.CRM.toggleHelp(this)">
                        <h3>🛡 Safeguards</h3>
                        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <div class="help-section-body">
                        <p>The following safeguards are enforced throughout the application:</p>
                        <ul>
                            <li><strong>No automatic messaging:</strong> The AI never sends messages to members. All drafts require manual review and sending by the community manager.</li>
                            <li><strong>No invented personalisation:</strong> AI suggestions are based solely on recorded activity data. No assumptions are made about personal circumstances.</li>
                            <li><strong>Engagement ≠ buying intent:</strong> Activity scores and engagement metrics are never treated as commercial signals. The system explicitly separates community engagement from any potential commercial interest.</li>
                            <li><strong>Commercial signal separation:</strong> If a commercial signal were detected (e.g., a member expressing interest in paid services), it would be flagged with a separate label and routed for human review — never mixed into the activity score.</li>
                            <li><strong>Human-in-the-loop:</strong> All actions require the community manager's explicit decision. The CRM is a support tool, not an automated system.</li>
                            <li><strong>Data privacy:</strong> All data is stored locally in the browser's localStorage. No data is sent to external servers.</li>
                        </ul>
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-section-header" onclick="window.CRM.toggleHelp(this)">
                        <h3>🧪 Testing Steps</h3>
                        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <div class="help-section-body">
                        <p>Follow these steps to verify all CRM features:</p>
                        <ol>
                            <li><strong>Overview Dashboard:</strong> Confirm that the overview shows correct counts for each member status. Click stat cards to navigate to focused views.</li>
                            <li><strong>Add a Member:</strong> Click "Add Member" in the top bar. Fill in all fields and submit. Verify the new member appears in the All Members list with "Newly Joined" status.</li>
                            <li><strong>Edit a Member:</strong> Click any member to view their detail. Click "Edit Member" to modify their info. Verify changes are saved.</li>
                            <li><strong>Record Activity:</strong> From a member's detail page, click "Record Activity". Fill in the form and submit. Verify the activity appears in the member's timeline and the activity count updates.</li>
                            <li><strong>Search and Filter:</strong> Use the global search bar to find members by name, email, or interest. Use the status and owner filters on the All Members page.</li>
                            <li><strong>Status Classification:</strong> Verify that members are classified correctly per the rules table above. Add activities to a member and confirm their status changes accordingly.</li>
                            <li><strong>Focused Views:</strong> Navigate to "Newly Joined", "Highly Active", and "At Risk / Dormant" views. Confirm each shows only the correct members.</li>
                            <li><strong>Follow-Up Queue:</strong> Navigate to the Follow-Up view. Verify it shows at-risk, dormant, and newly joined members with their pending actions.</li>
                            <li><strong>AI Assistant:</strong> Navigate to AI Assistant. Select a member and an action. Click "Generate Suggestion". Verify output appears with the "[SIMULATED]" label and contains relevant information.</li>
                            <li><strong>Data Persistence:</strong> Make changes (add a member, record activity). Refresh the page. Verify all changes persist.</li>
                            <li><strong>Reset Data:</strong> Click "Reset to Default Data" (on the Help page) to restore the original 18 fictional members.</li>
                        </ol>
                        <div style="margin-top:16px;">
                            <button class="btn btn-danger" onclick="if(confirm('Reset all data to defaults? This cannot be undone.')) window.CRM.resetData()">Reset to Default Data</button>
                        </div>
                    </div>
                </div>

                <div class="help-section">
                    <div class="help-section-header" onclick="window.CRM.toggleHelp(this)">
                        <h3>📐 Community Spaces</h3>
                        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <div class="help-section-body">
                        <p>The Friends of Finance community is organised into the following spaces:</p>
                        <ul>
                            ${COMMUNITY_SPACES.map(s => `<li><strong>${s}</strong></li>`).join('')}
                        </ul>
                        <p>Each activity is recorded against one of these spaces, allowing the CRM to track engagement across different community areas.</p>
                    </div>
                </div>
            </div>
        `;
    }

    function toggleHelp(headerEl) {
        const section = headerEl.parentElement;
        section.classList.toggle('open');
    }

    // =============================================
    // MODAL: Add/Edit Member
    // =============================================
    function openAddMember() {
        document.getElementById('modal-member-title').textContent = 'Add New Member';
        document.getElementById('member-id').value = '';
        document.getElementById('member-name').value = '';
        document.getElementById('member-email').value = '';
        document.getElementById('member-phone').value = '';
        document.getElementById('member-join-date').value = today.toISOString().split('T')[0];
        document.getElementById('member-owner').value = 'Alex Kim';
        document.getElementById('member-next-action').value = '';
        document.getElementById('member-interests').value = '';
        document.getElementById('member-notes').value = '';
        document.getElementById('modal-member').style.display = '';
    }

    function openEditMember(id) {
        const m = state.members.find(m => m.id === id);
        if (!m) return;

        document.getElementById('modal-member-title').textContent = 'Edit Member';
        document.getElementById('member-id').value = m.id;
        document.getElementById('member-name').value = m.name;
        document.getElementById('member-email').value = m.email;
        document.getElementById('member-phone').value = m.phone || '';
        document.getElementById('member-join-date').value = m.joinDate;
        document.getElementById('member-owner').value = m.owner;
        document.getElementById('member-next-action').value = m.nextAction || '';
        document.getElementById('member-interests').value = m.interests.join(', ');
        document.getElementById('member-notes').value = m.notes || '';
        document.getElementById('modal-member').style.display = '';
    }

    function closeMemberModal() {
        document.getElementById('modal-member').style.display = 'none';
    }

    function saveMember(e) {
        e.preventDefault();
        const id = document.getElementById('member-id').value;
        const name = document.getElementById('member-name').value.trim();
        const email = document.getElementById('member-email').value.trim();
        const phone = document.getElementById('member-phone').value.trim();
        const joinDate = document.getElementById('member-join-date').value;
        const owner = document.getElementById('member-owner').value;
        const nextAction = document.getElementById('member-next-action').value.trim();
        const interests = document.getElementById('member-interests').value.split(',').map(s => s.trim()).filter(Boolean);
        const notes = document.getElementById('member-notes').value.trim();

        if (!name || !email || !joinDate) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        if (id) {
            // Edit existing
            const member = state.members.find(m => m.id === parseInt(id));
            if (member) {
                member.name = name;
                member.email = email;
                member.phone = phone;
                member.joinDate = joinDate;
                member.owner = owner;
                member.nextAction = nextAction;
                member.interests = interests;
                member.notes = notes;
                showToast(`${name} updated successfully`, 'success');
            }
        } else {
            // Add new
            state.members.push({
                id: getNextId(),
                name, email, phone, joinDate, owner, nextAction, interests, notes,
                activities: []
            });
            showToast(`${name} added successfully`, 'success');
        }

        saveData();
        closeMemberModal();
        renderCurrentView();
    }

    // =============================================
    // MODAL: Record Activity
    // =============================================
    function openRecordActivity(memberId) {
        const m = state.members.find(m => m.id === memberId);
        if (!m) return;

        document.getElementById('activity-member-id').value = memberId;
        document.getElementById('activity-member-display').value = m.name;
        document.getElementById('activity-type').value = '';
        document.getElementById('activity-date').value = today.toISOString().split('T')[0];
        document.getElementById('activity-space').value = '';
        document.getElementById('activity-details').value = '';
        document.getElementById('modal-activity').style.display = '';
    }

    function closeActivityModal() {
        document.getElementById('modal-activity').style.display = 'none';
    }

    function saveActivity(e) {
        e.preventDefault();
        const memberId = parseInt(document.getElementById('activity-member-id').value);
        const type = document.getElementById('activity-type').value;
        const date = document.getElementById('activity-date').value;
        const space = document.getElementById('activity-space').value;
        const details = document.getElementById('activity-details').value.trim();

        if (!type || !date || !space) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        const member = state.members.find(m => m.id === memberId);
        if (member) {
            member.activities.push({ date, type, space, details });
            saveData();
            showToast(`Activity recorded for ${member.name}`, 'success');
            closeActivityModal();
            renderCurrentView();
        }
    }

    // =============================================
    // AI quick access from other views
    // =============================================
    function openAIForMember(memberId) {
        state.aiSelectedMember = memberId;
        state.aiSelectedAction = null;
        switchView('ai-assistant');
    }

    // =============================================
    // SEARCH
    // =============================================
    function onSearch(e) {
        state.searchQuery = e.target.value;
        if (state.currentView === 'all-members') {
            renderAllMembers();
        } else if (state.searchQuery.length > 0) {
            switchView('all-members');
        }
    }

    function onFilterChange() {
        state.filterStatus = document.getElementById('filter-status').value;
        state.filterOwner = document.getElementById('filter-owner').value;
        renderAllMembers();
    }

    function resetFilters() {
        state.filterStatus = 'all';
        state.filterOwner = 'all';
        state.searchQuery = '';
        document.getElementById('global-search').value = '';
        renderAllMembers();
    }

    function goBack() {
        switchView(state.previousView || 'all-members');
    }

    // =============================================
    // HTML Escape
    // =============================================
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // =============================================
    // EVENT BINDING
    // =============================================
    function bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.dataset.view;
                if (view) switchView(view);
            });
        });

        // Mobile menu toggle
        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });

        // Search
        document.getElementById('global-search').addEventListener('input', onSearch);

        // Add member button
        document.getElementById('btn-add-member').addEventListener('click', openAddMember);

        // Member form
        document.getElementById('form-member').addEventListener('submit', saveMember);
        document.getElementById('modal-member-close').addEventListener('click', closeMemberModal);
        document.getElementById('btn-cancel-member').addEventListener('click', closeMemberModal);

        // Activity form
        document.getElementById('form-activity').addEventListener('submit', saveActivity);
        document.getElementById('modal-activity-close').addEventListener('click', closeActivityModal);
        document.getElementById('btn-cancel-activity').addEventListener('click', closeActivityModal);

        // Close modals on overlay click
        document.getElementById('modal-member').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeMemberModal();
        });
        document.getElementById('modal-activity').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeActivityModal();
        });
    }

    // =============================================
    // PUBLIC API
    // =============================================
    window.CRM = {
        switchView,
        openRecordActivity,
        openEditMember,
        openAIForMember,
        onFilterChange,
        resetFilters,
        goBack,
        toggleHelp,
        onAIMemberChange,
        selectAIAction,
        runAI,
        resetData
    };

    // =============================================
    // INITIALISE
    // =============================================
    function init() {
        loadData();
        bindEvents();
        renderOverview();
    }

    document.addEventListener('DOMContentLoaded', init);

})();
