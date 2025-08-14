import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SocialPost, SocialAccount, TrendingTopic, SocialInteraction } from '../types/social';
import { socialMediaService } from '../services/socialMediaService';

interface SocialMediaState {
  posts: SocialPost[];
  accounts: SocialAccount[];
  trends: TrendingTopic[];
  interactions: SocialInteraction[];
  isLoading: boolean;
  error: string | null;
}

type SocialMediaAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POSTS'; payload: SocialPost[] }
  | { type: 'ADD_POST'; payload: SocialPost }
  | { type: 'UPDATE_POST'; payload: { id: string; updates: Partial<SocialPost> } }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'SET_ACCOUNTS'; payload: SocialAccount[] }
  | { type: 'SET_TRENDS'; payload: TrendingTopic[] }
  | { type: 'SET_INTERACTIONS'; payload: SocialInteraction[] }
  | { type: 'MARK_INTERACTION_READ'; payload: string };

const initialState: SocialMediaState = {
  posts: [],
  accounts: [],
  trends: [],
  interactions: [],
  isLoading: false,
  error: null,
};

function socialMediaReducer(state: SocialMediaState, action: SocialMediaAction): SocialMediaState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id
            ? { ...post, ...action.payload.updates }
            : post
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case 'SET_ACCOUNTS':
      return { ...state, accounts: action.payload };
    case 'SET_TRENDS':
      return { ...state, trends: action.payload };
    case 'SET_INTERACTIONS':
      return { ...state, interactions: action.payload };
    case 'MARK_INTERACTION_READ':
      return {
        ...state,
        interactions: state.interactions.map(interaction =>
          interaction.id === action.payload
            ? { ...interaction, isRead: true }
            : interaction
        ),
      };
    default:
      return state;
  }
}

interface SocialMediaContextType {
  state: SocialMediaState;
  publishPost: (postData: {
    content: string;
    platforms: string[];
    mediaUrls?: string[];
    scheduledAt?: string;
  }) => Promise<void>;
  fetchPosts: () => Promise<void>;
  fetchAccounts: () => Promise<void>;
  fetchTrends: (platform?: string) => Promise<void>;
  fetchInteractions: () => Promise<void>;
  markInteractionAsRead: (interactionId: string) => void;
  deletePost: (postId: string) => Promise<void>;
}

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

export function SocialMediaProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(socialMediaReducer, initialState);

  const publishPost = async (postData: {
    content: string;
    platforms: string[];
    mediaUrls?: string[];
    scheduledAt?: string;
  }) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await socialMediaService.publishPost(postData);
      const newPost: SocialPost = {
        id: result.id || Date.now().toString(),
        content: postData.content,
        platforms: postData.platforms,
        mediaUrls: postData.mediaUrls,
        scheduledAt: postData.scheduledAt,
        status: postData.scheduledAt ? 'scheduled' : 'published',
        publishedAt: postData.scheduledAt ? undefined : new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_POST', payload: newPost });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchPosts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const posts = await socialMediaService.getPostHistory();
      dispatch({ type: 'SET_POSTS', payload: posts });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchAccounts = async () => {
    try {
      const accounts = await socialMediaService.getConnectedAccounts();
      dispatch({ type: 'SET_ACCOUNTS', payload: accounts });
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  };

  const fetchTrends = async (platform?: string) => {
    try {
      const trends = await socialMediaService.getTrendingTopics(platform);
      dispatch({ type: 'SET_TRENDS', payload: trends });
    } catch (error) {
      console.error('Failed to fetch trends:', error);
    }
  };

  const fetchInteractions = async () => {
    try {
      const interactions = await socialMediaService.getSocialInteractions();
      dispatch({ type: 'SET_INTERACTIONS', payload: interactions });
    } catch (error) {
      console.error('Failed to fetch interactions:', error);
    }
  };

  const markInteractionAsRead = (interactionId: string) => {
    dispatch({ type: 'MARK_INTERACTION_READ', payload: interactionId });
  };

  const deletePost = async (postId: string) => {
    try {
      await socialMediaService.deletePost(postId);
      dispatch({ type: 'DELETE_POST', payload: postId });
    } catch (error) {
      console.error('Failed to delete post:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchTrends();
    fetchInteractions();
  }, []);

  const contextValue: SocialMediaContextType = {
    state,
    publishPost,
    fetchPosts,
    fetchAccounts,
    fetchTrends,
    fetchInteractions,
    markInteractionAsRead,
    deletePost,
  };

  return (
    <SocialMediaContext.Provider value={contextValue}>
      {children}
    </SocialMediaContext.Provider>
  );
}

export function useSocialMedia() {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
}