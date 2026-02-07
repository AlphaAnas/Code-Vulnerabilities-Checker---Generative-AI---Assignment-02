import { AnalysisType } from '../types';

export const detectInputType = (input: string): AnalysisType => {
  const trimmedInput = input.trim();

  const codeIndicators = [
    /^(function|const|let|var|class|import|export|public|private|protected)\s/i,
    /^(def|async\s+def|class)\s/i,
    /\{[\s\S]*\}/,
    /\([\s\S]*\)\s*=>/,
    /SELECT.*FROM/i,
    /INSERT\s+INTO/i,
    /UPDATE.*SET/i,
    /DELETE\s+FROM/i,
    /<\?php/i,
    /<%.*%>/,
    /#include\s*</,
    /package\s+\w+;/,
    /using\s+\w+;/,
    /^\s*(if|for|while|switch)\s*\(/i,
  ];

  const hasCodeIndicators = codeIndicators.some(pattern => pattern.test(trimmedInput));

  const hasCodeStructure =
    (trimmedInput.includes('{') && trimmedInput.includes('}')) ||
    (trimmedInput.includes('(') && trimmedInput.includes(')') && trimmedInput.includes('=>')) ||
    trimmedInput.split('\n').length > 3;

  const specsIndicators = [
    /\b(application|app|system|feature|functionality)\b/i,
    /\b(user|users|authentication|authorization)\b/i,
    /\b(database|api|endpoint|service)\b/i,
    /\b(requirement|spec|specification)\b/i,
    /\b(should|will|must|can)\b/i,
  ];

  const hasSpecsIndicators = specsIndicators.filter(pattern => pattern.test(trimmedInput)).length >= 2;

  if (hasCodeIndicators || hasCodeStructure) {
    return 'code';
  }

  if (hasSpecsIndicators && trimmedInput.length > 50) {
    return 'specs';
  }

  return 'general';
};

export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;

  return date.toLocaleDateString();
};
