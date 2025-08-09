# Monitoring & Analytics Setup

## Overview

This document describes the monitoring and analytics implementation for Wonderland Early Years & Prep School website.

## 1. DataFast Analytics

### Setup
- Create an account at [datafa.st](https://datafa.st) and get your Website ID
- Add your DataFast configuration to `.env.local`:
  ```
  NEXT_PUBLIC_DATAFAST_WEBSITE_ID=your_website_id_here
  NEXT_PUBLIC_DATAFAST_DOMAIN=wonderlandke.com
  ```
- DataFast will automatically track:
  - Page views
  - User sessions
  - Device types
  - Traffic sources
  - Core Web Vitals

### Custom Event Tracking
Use the `useDataFast` hook to track custom events:

```typescript
import { useDataFast } from '@/hooks/useDataFast';

const { trackEvent, trackFormSubmission } = useDataFast();

// Track form submission
trackFormSubmission('contact-form', true);

// Track custom event
trackEvent('button_click', {
  button: 'enroll_now',
  location: 'hero_section'
});
```

### Dashboard Access
- Access your analytics at: https://datafa.st/dashboard
- View real-time data, conversion funnels, and performance metrics
- DataFast is automatically disabled on localhost to prevent tracking development traffic

### Ad Blocker Bypass
The DataFast script is proxied through your own domain to bypass ad blockers:
- Script is served from `/df/script.js` instead of `datafa.st`
- Events are sent to `/df/events` instead of directly to DataFast
- This ensures analytics data is collected even when users have ad blockers enabled
- The proxy is configured in `next.config.ts` using Next.js rewrites

## 2. Error Tracking

### Setup
- Add your Sentry DSN to `.env.local` (optional):
  ```
  NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
  ```
- Errors are automatically captured and logged
- In development, errors are logged to console
- In production, errors are sent to the monitoring endpoint

### Manual Error Tracking
```typescript
import { errorTracker } from '@/lib/sentry';

// Capture exception
try {
  // Your code
} catch (error) {
  errorTracker.captureException(error, {
    tags: { component: 'ContactForm' },
    extra: { formData }
  });
}

// Capture message
errorTracker.captureMessage('User completed enrollment', 'info');
```

## 3. Performance Monitoring

### Automatic Metrics
The following metrics are automatically collected:
- Page Load Time
- DOM Content Loaded
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Long Tasks

DataFast also tracks these metrics automatically, providing a unified view of performance data.

### Custom Performance Marks
```typescript
import { performanceMonitor } from '@/lib/performance';

// Mark a custom timing
performanceMonitor.markCustomTiming('search-start');
// ... perform search ...
performanceMonitor.markCustomTiming('search-complete', 'search-start');
```

## 4. Health & Uptime Monitoring

### Endpoints

#### Health Check
- **URL**: `/api/health`
- **Method**: GET
- **Response**: System health status including database connectivity

#### Status Check
- **URL**: `/api/monitoring/status`
- **Method**: GET
- **Response**: Service status, uptime, and system information

### External Monitoring Services
Configure your monitoring service (e.g., UptimeRobot, Pingdom) to check:
- Primary: `https://wonderlandke.com/api/health`
- Secondary: `https://wonderlandke.com/api/monitoring/status`
- Check interval: 5 minutes
- Alert after: 2 failed checks

## 5. Monitoring Dashboard

### Key Metrics to Monitor
1. **Availability**: Uptime percentage
2. **Performance**: Page load times, Web Vitals
3. **Errors**: Error rate, error types
4. **Traffic**: Page views, unique visitors
5. **Conversions**: Form submissions, enrollment inquiries

### Recommended Tools
- **DataFast**: Traffic, user behavior, and performance analytics
- **Google Search Console**: SEO and search performance
- **Sentry**: Error tracking (when configured)
- **UptimeRobot**: Uptime monitoring (free tier available)

## 6. Alert Configuration

### Recommended Alerts
1. **Site Down**: Immediate alert if health check fails
2. **High Error Rate**: Alert if error rate > 1%
3. **Slow Performance**: Alert if LCP > 4 seconds
4. **Database Issues**: Alert on database connection failures

## 7. Privacy Compliance

### GDPR/Privacy Compliance
- DataFast is privacy-focused and GDPR compliant
- No cookies are used by DataFast (uses localStorage)
- Minimal data collection by default
- User consent should be obtained before tracking (implement consent banner if required)

## 8. Testing Monitoring

### Development
```bash
# Check health endpoint
curl http://localhost:3000/api/health

# Check status endpoint
curl http://localhost:3000/api/monitoring/status
```

### Production
```bash
# Check health endpoint
curl https://wonderlandke.com/api/health

# Check status endpoint
curl https://wonderlandke.com/api/monitoring/status
```

## 9. Maintenance

### Regular Tasks
- Weekly: Review error logs and performance metrics
- Monthly: Review analytics reports and user behavior
- Quarterly: Update monitoring thresholds based on baseline data

### Performance Baselines
After 30 days of data collection, establish baselines for:
- Average page load time
- Web Vitals scores
- Error rate
- Conversion rate

Use these baselines to set appropriate alert thresholds.

## 10. DataFast Features

### Advanced Analytics
- **Revenue Tracking**: Connect payment providers to track revenue attribution
- **Custom Events**: Track signups, clicks, and other key interactions
- **Funnel Analysis**: Understand user journey and conversion paths
- **Real-time Data**: See visitor activity as it happens

### Support
- Email: marc@datafa.st
- Twitter/X: @DataFast_
- Feature suggestions: https://feedback.datafa.st/