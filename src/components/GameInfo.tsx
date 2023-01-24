/* eslint-disable react/no-unescaped-entities */
import { Dialog, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";

export default function GameInfo(props: {
    open: boolean;
    setOpen: Function;
}) {
    const { open, setOpen } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="info-box">
                <div className="info-content">
                    <h2>Game Instructions</h2>
                    <p>
                        Racing through the streets of Solana your taxi driver takes you on a wild ride! The longer you travel in the taxi the more you can win. But beware, the driver drives risky, so the taxi is bound to crash sooner or later. Make sure to get off in time to collect your winnings!
                    </p>
                    <h2>HOW TO PLAY</h2>
                    <p>This is a multi-player game, where a lot of users can play the same Taxi Ride round at the same time.
                        The players individually choose their stake amount, but they all play the same bet with the same result.
                        The number of players participating, their target, or stake DO NOT affect the game or the bet outcome.
                        The goal is to get a result the same or higher than the number you have chosen.
                    </p>
                    <ul>
                        <li> ◦ If the bet is a win, the payout includes the stake amount and the profit amount based on the target cashout, not based on the game result.</li>
                        <li> ◦ The bet is a loss if the result is lower than the target multiplier.</li>
                    </ul>
                    <h2>STANDARD BETTING</h2>
                    <p>
                        The first step in order to start betting manually is to enter the stake amount.
                        <br />
                        <br />
                        In the &#39;Stake&#39; field, you may either input an amount manually or click one of these buttons:
                        <br />

                        - will lower the existing bet amount,
                        <br />
                        + will increase the existing bet amount,
                        <br />
                        quick amount buttons will set the amount as labeled on the button.
                        <br />
                        The target, &#39;Cashout at&#39;, means that the taxi driver has to drive the same or further than you predicted (bet result has to be the same or higher than the selected) in order for the bet to be a winning one.
                        <br />
                        If the bet result is below the target, the bet is lost.
                    </p>
                    <h2>ADVANCED BETTING</h2>

                    <p>
                        For players that don&#39;t like to constantly press the &#39;Place bet&#39; button or monitor their betting session all the time in order not to miss or skip a round, we provide the Auto-betting option.
                        All the possible settings will be explained below.
                    </p>
                    <ul style={{ paddingLeft: 10 }}>
                        <li>
                            1 Auto: In order to start an auto-betting session, press the &#39;Auto&#39; button, and it will reveal additional settings a player can use.
                        </li>
                        <li>
                            2 Number of rounds: A player can define upfront how many bets he/she wants to place. It can go anywhere from 1 to an &#39;infinite&#39; number of bets. If a player picks a certain number of bets, the game will automatically stop after that number of bets has been played.
                        </li>
                        <li>
                            3 Max stake: If a player uses settings like &#39;increase on loss&#39; or &#39;increase on win&#39; (read more about that below), he/she can define up to what amount the auto-betting will keep on placing the bets. If the bet amount reaches the defined &#39;max stake&#39;, it will no longer continue increasing the bet amount for all the future bets.
                        </li>
                        <li>
                            4 On win: This section has many different options for a player to choose from:
                            <br />
                            ◦ Stop - it will stop auto betting as soon as the first winning bet is placed.
                            <br />
                            ◦ Reset - if a player has &#39;increase on loss&#39; settings applied after the bet has been a win, the stake amount will be automatically reset to the originally set stake amount in the stake field.
                            <br />
                            ◦ Custom - a player has an option to customize how the stake amounts will behave on every single winning bet. He/she can choose to lower the stake for a certain percentage (-50%, for example, will decrease (halve) the stake amount on every winning bet) or to increase the stake for a certain percentage (100%, for example, will increase (double) the stake amount for every winning bet).
                        </li>
                        <li>
                            5 On loss: This section is opposite from the previous one. It defines the behavior of auto-betting once a bet is lost.
                            <br />
                            ◦ Stop - it will stop auto betting as soon as the first losing bet is placed.
                            <br />
                            ◦ Reset - if a player has &#39;increase on win&#39; settings applied after the bet has been a loss, the stake amount will be automatically reset to the originally set stake amount in the stake field.
                            <br />
                            ◦ Custom - a player has an option to customize how the stake amounts will behave on every single losing bet. He/she can choose to lower the stake for a certain percentage (-50%, for example, will decrease (for ½) the stake amount on every losing bet) or to increase the stake for a certain percentage (25%, for example, will increase (for ¼) the stake amount on every losing bet).
                        </li>
                        <li>
                            6 Auto escape: In order to chose a target multiplier where the player automatically does a cashout the player can toggle "Auto escape" to "on" and choose what multipler that should result in an automatic cashout if reached.
                            After all the settings are adjusted the way the player wants them to be, in order to start a betting session, it is just necessary to click the &#39;Place bet&#39; button.
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
    )
}
