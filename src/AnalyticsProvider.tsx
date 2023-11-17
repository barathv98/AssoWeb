import mixpanel from 'mixpanel-browser';
import { createContext, useCallback, useMemo, useState } from 'react';
import { ReactFCC } from "./common/interface";
import { MixpanelEvent } from "./utils/constants";

export interface AnalyticsContextType {
	trackEvent: (event: MixpanelEvent, data: any) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({} as AnalyticsContextType);

interface AnalyticsProviderProps {
	children: any;
}

const isProd = window.location.hostname !== 'localhost';
export const AnalyticsProvider: ReactFCC<AnalyticsProviderProps> = ({ children }) => {
	const [isInitialized, setIsInitialized] = useState(false);

	const initAnalytics = useCallback(() => {
		if (!isProd || isInitialized) return false;
		mixpanel.init('d84d4df904519e15810cfd38c15e4976', {
			debug: !isProd,
            track_pageview: true,
		});
		setIsInitialized(true);
		return true;
	}, [isInitialized, setIsInitialized]);

	const trackEvent = useCallback(async (eventName: MixpanelEvent, eventProperties: object = {}) => {
		if (!isProd) return;
		mixpanel?.track(eventName, eventProperties);
	}, []);

	const AnalyticsProviderValue = useMemo(
		(): AnalyticsContextType => ({ trackEvent }),
		[trackEvent]
	);

	initAnalytics();

	return <AnalyticsContext.Provider value={AnalyticsProviderValue}>{children}</AnalyticsContext.Provider>;
};

export default AnalyticsContext;
