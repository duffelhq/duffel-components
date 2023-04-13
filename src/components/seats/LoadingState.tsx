import * as React from "react";
import { Icon } from "../Icon";

const LOADING_MESSAGE = "Loading seat map";

export interface LoadingStateProps {
  origin: string;
  destination: string;
  duration: string;
  done: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  origin,
  destination,
  duration,
  done,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const loadingIndicator = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (loaded) {
      done && done();
    }
  });

  return !loaded ? (
    <div className="loading-state__container">
      <span className="loading-state__message">{LOADING_MESSAGE}</span>
      <div className="loading-state__progress-indicator">
        <span
          className="loading-state__progress-indicator--status"
          ref={loadingIndicator}
          onAnimationEnd={() => setLoaded(true)}
          data-testid="loading-state__progress-indicator--status"
        />
      </div>
      <div className="loading-state__segment">
        <span className="loading-state__segment--origin">{origin}</span>
        <Icon name="arrow_forward" size={20} />
        <span className="loading-state__segment--destination">
          {destination}
        </span>
      </div>
      <span className="loading-state__duration">{duration}</span>
    </div>
  ) : null;
};
