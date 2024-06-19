export interface IProgressBarProps {
    userSpace: IUserSpace,  
}

interface IUserSpace {
    spaceAvailable: number,
    spaceUsed: number,
}