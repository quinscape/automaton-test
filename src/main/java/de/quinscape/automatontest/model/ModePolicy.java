package de.quinscape.automatontest.model;

/**
 * Enumerates all policies of how to combine rule-based mode values with the effective field modes before rule application.
 */
public enum ModePolicy
{
    /**
     * Ignore local mode attribute completely.
     */
    IGNORE_LOCAL,

    /**
     * Override if effective mode is be NORMAL
     */
    OVERRIDE
}
