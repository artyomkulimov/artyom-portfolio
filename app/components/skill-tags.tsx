export default function SkillTags({ skills }: { skills: string[] }) {
  return (
    <ul aria-label="skills" className="mt-3 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <li
          className="inline-flex h-7 items-center rounded-md border border-neutral-300 bg-neutral-50 px-2.5 text-[11px] font-medium text-neutral-700 shadow-sm transition-colors hover:border-neutral-500 hover:bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
          key={skill}
        >
          {skill}
        </li>
      ))}
    </ul>
  )
}
