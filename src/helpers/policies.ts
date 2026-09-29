import type { UserType } from "../types/AuthTypes";
import type { ProjectType } from "../types/ProjectTypes";

export const isManager = (managerId: ProjectType['manager'], userId : UserType['_id']) => {
    return managerId._id === userId;
}